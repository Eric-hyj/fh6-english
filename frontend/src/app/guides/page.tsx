'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, TrendingUp, Clock, ChevronRight, SlidersHorizontal, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { GUIDE_CATEGORIES } from '@/lib/constants'
import { api } from '@/lib/api'

type GuideItem = {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string
  reads: number
  publishedAt: string
}

function formatReads(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export default function GuidesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [guides, setGuides] = useState<GuideItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.guides.list({ pageSize: 50 }).then((res: any) => {
      setGuides(res.data.map((item: any) => ({ id: item.id, ...item })))
    }).catch(() => {
      setGuides([])
    }).finally(() => setLoading(false))
  }, [])

  const filtered = guides.filter((g) => {
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || (g.excerpt || '').toLowerCase().includes(search.toLowerCase())
    const matchCat = !activeCategory || g.category.toLowerCase() === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="container-custom py-10">
      {/* Header */}
      <div className="mb-10">
        <Badge variant="default" className="mb-3">Guides</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">All FH6 Guides</h1>
        <p className="text-muted-foreground max-w-xl">Expert-written guides covering everything from beginner tips to advanced tuning. Updated daily.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !activeCategory ? 'bg-brand-600 text-white' : 'bg-accent text-muted-foreground hover:text-foreground'
          }`}
        >
          All
        </button>
        {GUIDE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id ? 'bg-brand-600 text-white' : 'bg-accent text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Guide Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No guides found matching your search.</p>
          <p className="text-sm mt-2">Try different keywords or browse all categories.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-[10px]">{guide.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {formatReads(guide.reads)} reads
                    </span>
                  </div>
                  <CardTitle className="text-base leading-snug">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{guide.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(guide.publishedAt)}
                    </span>
                    <span className="text-sm text-brand-400 font-medium flex items-center gap-1">
                      Read <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
