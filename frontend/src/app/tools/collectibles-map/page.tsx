'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Search, CheckCircle2, Circle, Filter, ArrowLeft, Map, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { POINTS_OF_INTEREST, REGIONS, COLLECTIBLE_GROUPS, POI_TYPE_CONFIG } from '@/data/map-data'
import type { POIType, MapPOI } from '@/data/map-data'

const MapView = dynamic(() => import('./MapView'), { ssr: false, loading: () => (
  <div className="w-full h-full flex items-center justify-center bg-accent/30">
    <div className="text-center">
      <div className="h-10 w-10 border-2 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-sm text-muted-foreground">Loading map...</p>
    </div>
  </div>
)})

const STORAGE_KEY = 'fh6-map-found'
const ALL_REGIONS = 'All Regions'
const ALL_TYPES = 'All Types'

const TYPE_FILTERS: { key: string; label: string; color: string; icon: string }[] = [
  { key: ALL_TYPES, label: 'All', color: '#fff', icon: '📍' },
  ...Object.entries(POI_TYPE_CONFIG).map(([key, cfg]) => ({
    key, label: cfg.label, color: cfg.color, icon: cfg.icon,
  })),
]

export default function CollectiblesMapPage() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState(ALL_TYPES)
  const [selectedRegion, setSelectedRegion] = useState(ALL_REGIONS)
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setFoundIds(new Set(JSON.parse(saved)))
    } catch {}
    setMounted(true)
  }, [])

  // Persist to localStorage
  const toggleFound = useCallback((id: string) => {
    setFoundIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])) } catch {}
      return next
    })
  }, [])

  const clearFound = useCallback(() => {
    setFoundIds(new Set())
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  // Filtered POIs
  const filtered = useMemo(() => {
    return POINTS_OF_INTEREST.filter((poi) => {
      const matchSearch = !search || poi.name.toLowerCase().includes(search.toLowerCase()) || poi.description.toLowerCase().includes(search.toLowerCase())
      const matchType = selectedType === ALL_TYPES || poi.type === selectedType
      const matchRegion = selectedRegion === ALL_REGIONS || poi.region === selectedRegion
      return matchSearch && matchType && matchRegion
    })
  }, [search, selectedType, selectedRegion])

  const regionNames = useMemo(() => {
    const names = [ALL_REGIONS]
    REGIONS.forEach((r) => names.push(r.name))
    return names
  }, [])

  const totalCount = POINTS_OF_INTEREST.length
  const foundCount = foundIds.size
  const progress = totalCount > 0 ? Math.round((foundCount / totalCount) * 100) : 0
  const filteredFound = filtered.filter((p) => foundIds.has(p.id)).length

  // Type stats
  const typeStats = useMemo(() => {
    const stats: Record<string, { total: number; found: number }> = {}
    POINTS_OF_INTEREST.forEach((p) => {
      if (!stats[p.type]) stats[p.type] = { total: 0, found: 0 }
      stats[p.type].total++
      if (foundIds.has(p.id)) stats[p.type].found++
    })
    return stats
  }, [foundIds])

  return (
    <div className="container-custom py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="default" className="bg-brand-600/10 text-brand-400 border-brand-600/20">
            Interactive Tool
          </Badge>
          <Badge variant="outline" className="text-xs">
            {POINTS_OF_INTEREST.length} POIs
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">FH6 Japan Interactive Map</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore every landmark, touge pass, barn find, treasure car, circuit, and car meet across Japan.
          Mark locations as discovered to track your completion.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Map */}
        <Card className="overflow-hidden h-[75vh] lg:h-[calc(100vh-280px)] min-h-[400px] relative">
          {mounted && <MapView
            pois={filtered}
            activeRegion={selectedRegion !== ALL_REGIONS ? REGIONS.find((r) => r.name === selectedRegion)?.id ?? null : null}
            onToggleFound={toggleFound}
            foundIds={foundIds}
          />}
        </Card>

        {/* Sidebar */}
        <div className="space-y-4 max-h-[75vh] lg:max-h-[calc(100vh-280px)] overflow-y-auto">
          {/* Progress Card */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Discovery Progress</span>
                <span className="text-2xl font-bold text-brand-400">{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-accent overflow-hidden mb-4">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 to-amber-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Per-type progress bars */}
              <div className="space-y-1.5 mb-3">
                {Object.entries(typeStats).map(([type, stats]) => {
                  const cfg = POI_TYPE_CONFIG[type as POIType]
                  const pct = stats.total > 0 ? Math.round((stats.found / stats.total) * 100) : 0
                  return (
                    <div key={type} className="flex items-center gap-2 text-xs">
                      <span className="w-4 text-center">{cfg.icon}</span>
                      <span className="w-20 text-muted-foreground truncate">{cfg.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-accent overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
                      </div>
                      <span className="w-10 text-right tabular-nums text-muted-foreground">
                        {stats.found}/{stats.total}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {foundCount} / {totalCount} discovered
                </p>
                {foundCount > 0 && (
                  <button onClick={clearFound} className="text-xs text-red-400 hover:text-red-300 transition-colors">
                    Reset
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Collectible Reference */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Map className="h-4 w-4" />
                Collectible Totals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {Object.entries(COLLECTIBLE_GROUPS).map(([key, group]) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                  <span className="font-mono text-foreground font-medium">{group.total}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search POIs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 text-sm h-9"
                />
              </div>

              {/* Type filter */}
              <div className="flex flex-wrap gap-1">
                {TYPE_FILTERS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setSelectedType(t.key)}
                    className={cn(
                      'px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1',
                      selectedType === t.key
                        ? 'bg-brand-600 text-white'
                        : 'bg-accent text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Region filter */}
              <div className="flex flex-wrap gap-1">
                {regionNames.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={cn(
                      'px-2 py-1 rounded text-xs font-medium transition-colors',
                      selectedRegion === r
                        ? 'bg-brand-600 text-white'
                        : 'bg-accent text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results count */}
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>{filtered.length} locations</span>
            {filteredFound > 0 && <span>{filteredFound} found</span>}
          </div>

          {/* POI List */}
          <div className="space-y-1.5">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No locations match your filters.
              </div>
            ) : (
              filtered.map((poi) => {
                const cfg = POI_TYPE_CONFIG[poi.type]
                const isFound = foundIds.has(poi.id)

                return (
                  <button
                    key={poi.id}
                    onClick={() => toggleFound(poi.id)}
                    className={cn(
                      'w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5',
                      isFound
                        ? 'border-green-600/30 bg-green-600/5'
                        : 'border-border hover:border-muted bg-card'
                    )}
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm"
                      style={{ backgroundColor: cfg.color + '18' }}
                    >
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={cn(
                          'text-sm font-medium truncate',
                          isFound && 'line-through text-muted-foreground'
                        )}>
                          {poi.name}
                        </span>
                        {isFound && <CheckCircle2 className="h-3 w-3 text-green-400 shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs px-1 rounded" style={{ backgroundColor: cfg.color + '18', color: cfg.color }}>
                          {cfg.label}
                        </span>
                        <span className="text-xs text-muted-foreground">· {poi.region}</span>
                      </div>
                      {poi.reward && (
                        <div className="text-xs text-amber-400/80 mt-0.5 truncate">{poi.reward}</div>
                      )}
                    </div>
                    {!isFound && <Circle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1.5" />}
                  </button>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
