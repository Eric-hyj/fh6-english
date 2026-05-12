'use client'

import { useState } from 'react'
import { Map, Search, CheckCircle2, Circle, Filter, Trophy, Camera, Wrench, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type CollectibleType = 'barn_find' | 'fast_travel' | 'xp_board' | 'bonus_board' | 'story'

interface Collectible {
  id: string
  name: string
  type: CollectibleType
  region: string
  coordinates: string
  reward: string
  found: boolean
}

const COLLECTIBLES: Collectible[] = [
  { id: 'bf1', name: 'Barn Find: Ford Mustang GT', type: 'barn_find', region: 'Central Valley', coordinates: 'E4', reward: 'Ford Mustang GT', found: false },
  { id: 'bf2', name: 'Barn Find: Nissan Skyline GT-R', type: 'barn_find', region: 'Mountain Pass', coordinates: 'F7', reward: 'Nissan Skyline GT-R', found: false },
  { id: 'bf3', name: 'Barn Find: Lamborghini Miura', type: 'barn_find', region: 'Coastal Hills', coordinates: 'C3', reward: 'Lamborghini Miura', found: false },
  { id: 'bf4', name: 'Barn Find: Ferrari 250 GT', type: 'barn_find', region: 'Forest Ridge', coordinates: 'G9', reward: 'Ferrari 250 GT', found: false },
  { id: 'bf5', name: 'Barn Find: Porsche 911 Carrera', type: 'barn_find', region: 'Desert Flats', coordinates: 'H2', reward: 'Porsche 911 Carrera', found: false },
  { id: 'ft1', name: 'Fast Travel Board #1', type: 'fast_travel', region: 'Central Valley', coordinates: 'D5', reward: 'Fast Travel Unlock', found: false },
  { id: 'ft2', name: 'Fast Travel Board #2', type: 'fast_travel', region: 'Coastal Hills', coordinates: 'B4', reward: 'Fast Travel Unlock', found: false },
  { id: 'ft3', name: 'Fast Travel Board #3', type: 'fast_travel', region: 'Mountain Pass', coordinates: 'E8', reward: 'Fast Travel Unlock', found: false },
  { id: 'xp1', name: 'XP Board: Central', type: 'xp_board', region: 'Central Valley', coordinates: 'D6', reward: '500 XP', found: false },
  { id: 'xp2', name: 'XP Board: Coastal', type: 'xp_board', region: 'Coastal Hills', coordinates: 'C5', reward: '500 XP', found: false },
  { id: 'xp3', name: 'XP Board: Mountain', type: 'xp_board', region: 'Mountain Pass', coordinates: 'F9', reward: '500 XP', found: false },
  { id: 'bb1', name: 'Bonus Board: Credits', type: 'bonus_board', region: 'Desert Flats', coordinates: 'H3', reward: '10,000 Credits', found: false },
  { id: 'bb2', name: 'Bonus Board: XP Boost', type: 'bonus_board', region: 'Forest Ridge', coordinates: 'G8', reward: '2x XP 30min', found: false },
]

const TYPE_CONFIG: Record<CollectibleType, { label: string; icon: typeof Star; color: string; bgClass: string }> = {
  barn_find: { label: 'Barn Find', icon: Wrench, color: '#e62429', bgClass: 'bg-red-600/10 border-red-600/30' },
  fast_travel: { label: 'Fast Travel', icon: Map, color: '#22c55e', bgClass: 'bg-green-600/10 border-green-600/30' },
  xp_board: { label: 'XP Board', icon: Star, color: '#f59e0b', bgClass: 'bg-amber-600/10 border-amber-600/30' },
  bonus_board: { label: 'Bonus Board', icon: Trophy, color: '#a855f7', bgClass: 'bg-purple-600/10 border-purple-600/30' },
  story: { label: 'Story', icon: Camera, color: '#3b82f6', bgClass: 'bg-blue-600/10 border-blue-600/30' },
}

const REGIONS = ['All Regions', 'Central Valley', 'Coastal Hills', 'Mountain Pass', 'Forest Ridge', 'Desert Flats']
const TYPE_FILTERS = ['All Types', 'barn_find', 'fast_travel', 'xp_board', 'bonus_board']

export default function CollectiblesMapPage() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<string>('All Types')
  const [selectedRegion, setSelectedRegion] = useState('All Regions')
  const [collected, setCollected] = useState<Set<string>>(new Set())

  const toggleCollected = (id: string) => {
    setCollected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = COLLECTIBLES.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase())
    const matchType = selectedType === 'All Types' || c.type === selectedType
    const matchRegion = selectedRegion === 'All Regions' || c.region === selectedRegion
    return matchSearch && matchType && matchRegion
  })

  const totalCount = COLLECTIBLES.length
  const foundCount = collected.size
  const progress = totalCount > 0 ? Math.round((foundCount / totalCount) * 100) : 0

  return (
    <div className="container-custom py-10">
      <div className="mb-8">
        <Badge variant="default" className="mb-3">Interactive Tool</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Collectibles Map</h1>
        <p className="text-muted-foreground max-w-xl">Track your collection progress across all FH6 collectibles. Mark items as found and monitor your completion percentage.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Map Area (Visual) */}
        <div className="space-y-4">
          <Card className="relative overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-brand-900/20 to-accent relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(230,36,41,0.05),transparent_50%)]" />

              {/* Grid overlay */}
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-border/20" />
                ))}
              </div>

              <div className="relative z-10 text-center">
                <Map className="h-16 w-16 text-brand-400/50 mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">
                  Interactive map will render here with Leaflet.js
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Pin locations will be plotted on the game world map
                </p>
              </div>
            </div>

            {/* Region labels */}
            <div className="grid grid-cols-5 gap-2 p-4 bg-card/50">
              {REGIONS.filter(r => r !== 'All Regions').map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={cn(
                    'px-2 py-1.5 rounded-lg text-xs font-medium transition-colors text-center',
                    selectedRegion === region ? 'bg-brand-600 text-white' : 'bg-accent text-muted-foreground hover:text-foreground'
                  )}
                >
                  {region}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress */}
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Collection Progress</span>
                <span className="text-2xl font-bold text-brand-400">{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-accent overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-amber-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{foundCount} / {totalCount} found</p>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm"
              />
              <div className="flex flex-wrap gap-1.5">
                {TYPE_FILTERS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                      selectedType === t ? 'bg-brand-600 text-white' : 'bg-accent text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {t === 'All Types' ? 'All' : TYPE_CONFIG[t as CollectibleType]?.label || t}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* List */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No collectibles match your filters.
              </div>
            ) : (
              filtered.map((c) => {
                const typeCfg = TYPE_CONFIG[c.type]
                const Icon = typeCfg.icon
                const isFound = collected.has(c.id)

                return (
                  <button
                    key={c.id}
                    onClick={() => toggleCollected(c.id)}
                    className={cn(
                      'w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3',
                      isFound ? 'border-green-600/30 bg-green-600/5' : 'border-border hover:border-muted bg-card'
                    )}
                  >
                    <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs', typeCfg.bgClass)} style={{ borderColor: typeCfg.color + '40' }}>
                      <Icon className="h-4 w-4" style={{ color: typeCfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn('text-sm font-medium truncate', isFound && 'line-through text-muted-foreground')}>
                          {c.name}
                        </span>
                        {isFound && <CheckCircle2 className="h-3.5 w-3.5 text-green-400 shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{c.region}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{c.coordinates}</span>
                      </div>
                      <div className="text-xs text-amber-400/80 mt-0.5">{c.reward}</div>
                    </div>
                    {!isFound && <Circle className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />}
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
