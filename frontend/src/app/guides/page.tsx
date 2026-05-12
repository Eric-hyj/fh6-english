'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, TrendingUp, Clock, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { GUIDE_CATEGORIES } from '@/lib/constants'

const ALL_GUIDES = [
  { title: 'FH6 Beginner Guide: Everything You Need to Know', category: 'beginner', slug: 'fh6-beginner-guide', date: 'May 15, 2026', reads: '12.4k', excerpt: 'New to Forza Horizon 6? Start here with our complete beginner guide covering controls, menus, and first steps.' },
  { title: 'Best Starter Cars in Forza Horizon 6', category: 'cars', slug: 'best-starter-cars-fh6', date: 'May 14, 2026', reads: '8.7k', excerpt: 'Don\'t waste your starting credits. Our picks for the best value starter cars that will carry you through the early game.' },
  { title: 'How to Get Unlimited Credits Fast in FH6', category: 'racing', slug: 'unlimited-credits-fh6', date: 'May 13, 2026', reads: '6.2k', excerpt: 'The fastest credit farming methods tested and ranked. From racing circuits to the auction house, we cover it all.' },
  { title: 'All Barn Finds Locations Guide', category: 'collectibles', slug: 'all-barn-finds-locations-fh6', date: 'May 12, 2026', reads: '5.8k', excerpt: 'Complete map and guide to every Barn Find location in Forza Horizon 6. Includes coordinates and driving tips.' },
  { title: 'Best Tuning Setup for Each Car Class', category: 'cars', slug: 'best-tuning-setup-fh6', date: 'May 11, 2026', reads: '4.9k', excerpt: 'Master tuning with our class-by-class guide. From D-class to S2, get the optimal setup for every race type.' },
  { title: 'FH6 Achievement Guide: 100% Completion', category: 'achievements', slug: 'fh6-achievement-guide', date: 'May 10, 2026', reads: '3.6k', excerpt: 'Your roadmap to 100% achievements in Forza Horizon 6. Every achievement explained with tips and tricks.' },
  { title: 'Best Cars for Off-Road Racing in FH6', category: 'cars', slug: 'best-offroad-cars-fh6', date: 'May 9, 2026', reads: '4.2k', excerpt: 'Dominate the dirt with our top picks for off-road vehicles. Includes tuning recommendations for each terrain type.' },
  { title: 'How to Unlock All Fast Travel Boards', category: 'collectibles', slug: 'fast-travel-boards-fh6', date: 'May 8, 2026', reads: '3.1k', excerpt: 'Save time and credits by unlocking fast travel early. Our complete guide to every fast travel board location.' },
  { title: 'FH6 Drift Tuning Guide: Master the Art of Drifting', category: 'racing', slug: 'fh6-drift-tuning-guide', date: 'May 7, 2026', reads: '2.8k', excerpt: 'Learn the secrets of drift tuning. From angle kits to tire pressure, build the ultimate drift machine.' },
  { title: 'Weekly Challenges Guide: Season 1', category: 'racing', slug: 'fh6-season-1-challenges', date: 'May 6, 2026', reads: '2.1k', excerpt: 'Complete every Season 1 weekly challenge with our step-by-step guide. Includes optimal car choices and routes.' },
  { title: 'XP Board Locations: Complete Collection', category: 'collectibles', slug: 'xp-boards-fh6', date: 'May 5, 2026', reads: '2.5k', excerpt: 'Every XP board location in Forza Horizon 6. Fast track your way to max level with our complete collection guide.' },
  { title: 'FH6 Wheelspin Guide: Best Cars & Rewards', category: 'beginner', slug: 'fh6-wheelspin-guide', date: 'May 4, 2026', reads: '1.9k', excerpt: 'Maximize your Wheelspin rewards. We break down the prize pools and share strategies for getting the best drops.' },
]

export default function GuidesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = ALL_GUIDES.filter((g) => {
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCat = !activeCategory || g.category === activeCategory
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
      {filtered.length === 0 ? (
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
                      {guide.reads} reads
                    </span>
                  </div>
                  <CardTitle className="text-base leading-snug">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{guide.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {guide.date}
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
