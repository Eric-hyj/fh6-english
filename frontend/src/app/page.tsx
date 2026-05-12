'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Swords, Calculator, Map, Trophy, Users, Zap, Crown, Clock, TrendingUp, Star, ChevronRight, Sparkles, Gamepad2, Gauge, Sun, Mountain, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GAME_LAUNCH_DATE } from '@/lib/constants'
import { api } from '@/lib/api'

const FEATURED_GUIDES = [
  { title: 'FH6 Beginner Guide: Everything You Need to Know', category: 'Beginner', reads: '12.4k', slug: 'fh6-beginner-guide' },
  { title: 'Best Starter Cars in Forza Horizon 6', category: 'Cars', reads: '8.7k', slug: 'best-starter-cars-fh6' },
  { title: 'How to Get Unlimited Credits Fast in FH6', category: 'Racing', reads: '6.2k', slug: 'unlimited-credits-fh6' },
  { title: 'All Barn Finds Locations Guide', category: 'Collectibles', reads: '5.8k', slug: 'all-barn-finds-locations-fh6' },
  { title: 'Best Tuning Setup for Each Car Class', category: 'Cars', reads: '4.9k', slug: 'best-tuning-setup-fh6' },
  { title: 'FH6 Achievement Guide: 100% Completion', category: 'Achievements', reads: '3.6k', slug: 'fh6-achievement-guide' },
]

const REGIONS = [
  { name: 'Central Valley', desc: 'Urban street races & highway sprints', icon: Sun, color: '#f59e0b' },
  { name: 'Mountain Pass', desc: 'Tight curves & elevation changes', icon: Mountain, color: '#22c55e' },
  { name: 'Coastal Hills', desc: 'Beachside cruising & drift zones', icon: Gauge, color: '#3b82f6' },
]

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function tick() {
      const now = new Date()
      const diff = GAME_LAUNCH_DATE.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const isLaunched = new Date() >= GAME_LAUNCH_DATE

  if (isLaunched) {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-sm font-medium">
        <Sparkles className="h-4 w-4" />
        <span>Forza Horizon 6 is NOW AVAILABLE!</span>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 text-amber-400 text-sm mb-4 font-medium">
        <Clock className="h-4 w-4" />
        <span>Launching in</span>
      </div>
      <div className="flex justify-center gap-3 md:gap-5">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Minutes' },
          { value: timeLeft.seconds, label: 'Seconds' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="text-3xl md:text-5xl font-bold bg-card/60 backdrop-blur-sm border border-border rounded-xl px-4 md:px-6 py-3 min-w-[80px] md:min-w-[100px] shadow-lg">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [featuredGuides, setFeaturedGuides] = useState<any[]>([])
  const [guidesLoading, setGuidesLoading] = useState(true)

  useEffect(() => {
    api.guides.list({ pageSize: 6 }).then((res: any) => {
      setFeaturedGuides(res.data.map((item: any) => ({ id: item.id, ...item })))
    }).catch(() => {
      setFeaturedGuides([])
    }).finally(() => setGuidesLoading(false))
  }, [])
  return (
    <>
      {/* ──────────── HERO ──────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-600/30 text-brand-400 text-xs font-medium mb-6">
              <Gamepad2 className="h-3.5 w-3.5" />
              Forza Horizon 6 — Launching May 19
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              The Ultimate{' '}
              <span className="gradient-text">Forza Horizon 6</span>
              {' '}Resource
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Master every race, find every Barn Find, build the ultimate car collection,
              and dominate the open world with expert guides, interactive tools, and pro tuning setups.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/guides">
                <Button size="lg" className="text-base gap-2 px-8 h-12">
                  Browse Guides <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools/tuning-calculator">
                <Button variant="outline" size="lg" className="text-base gap-2 px-8 h-12">
                  <Calculator className="h-4 w-4" />
                  Try Tuning Tool
                </Button>
              </Link>
            </div>

            <div className="mt-14">
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── STATS BAR ──────────── */}
      <section className="border-y border-border bg-card/50">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Swords, value: '550+', label: 'Vehicles', color: '#e62429' },
              { icon: Map, value: '200+', label: 'Guides', color: '#22c55e' },
              { icon: Users, value: '10k+', label: 'Daily Users', color: '#3b82f6' },
              { icon: Star, value: '4.8', label: 'User Rating', color: '#f59e0b' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="space-y-1.5">
                <div className="flex justify-center">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                </div>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── GAME REGIONS ──────────── */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4">Explore the World</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Mexico in FH6</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three distinct regions, each with unique challenges, collectibles, and driving experiences.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REGIONS.map((region, i) => {
              const Icon = region.icon
              const gradients = [
                'from-amber-600/20 via-brand-600/10 to-transparent',
                'from-green-600/20 via-emerald-600/10 to-transparent',
                'from-blue-600/20 via-sky-600/10 to-transparent',
              ]
              return (
                <div key={region.name} className="relative rounded-2xl overflow-hidden border border-border bg-card group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl mb-4" style={{ backgroundColor: `${region.color}15` }}>
                      <Icon className="h-6 w-6" style={{ color: region.color }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{region.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{region.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: region.color }}>
                      <span>Explore guides</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ──────────── INTERACTIVE TOOLS ──────────── */}
      <section className="py-20 bg-card/30 border-y border-border">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4">Interactive Tools</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tools at Your Fingertips</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Beyond simple guides — build, tune, and optimize your FH6 experience with our interactive toolset.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/tools/tuning-calculator">
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-brand-600/15 flex items-center justify-center">
                      <Calculator className="h-5 w-5 text-brand-400" />
                    </div>
                    <CardTitle className="text-xl">Vehicle Tuning Calculator</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Select any vehicle, choose your build type, and get the perfect tuning setup.
                    Includes budget builds, balanced setups, and max performance configurations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['550+ Vehicles', 'Radar Chart', 'Save Builds', 'Share Setups'].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-accent text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/collectibles-map">
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-amber-600/15 flex items-center justify-center">
                      <Map className="h-5 w-5 text-amber-400" />
                    </div>
                    <CardTitle className="text-xl">Collectibles Interactive Map</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Interactive map of all Barn Finds, fast travel boards, XP boards, and
                    collectibles. Track your progress with local storage.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Interactive Map', 'Progress Tracker', 'Filters', 'Local Save'].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-accent text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────── FEATURED GUIDES ──────────── */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Badge variant="default" className="mb-3">Popular Guides</Badge>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Articles</h2>
            </div>
            <Link href="/guides">
              <Button variant="ghost" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidesLoading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : featuredGuides.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No guides available yet. Check back soon!</p>
              </div>
            ) : (
              featuredGuides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                  <Card className="card-hover h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-[10px]">{guide.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {guide.reads >= 1000 ? `${(guide.reads / 1000).toFixed(1)}k` : guide.reads} reads
                        </span>
                      </div>
                      <CardTitle className="text-base leading-snug">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-brand-400 font-medium">
                        Read Guide <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ──────────── PREMIUM CTA ──────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-amber-600/5 to-transparent" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-600/20 to-brand-600/20 border border-amber-500/30 flex items-center justify-center">
                <Crown className="h-8 w-8 text-amber-400" />
              </div>
            </div>
            <Badge variant="gold" className="mb-4">Premium Membership</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock the Full FH6 Experience
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto">
              Get ad-free browsing, exclusive tuning setups, PDF guides, and early access to all new tools and content.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/membership/register">
                <Button variant="gold" size="lg" className="text-base gap-2 px-8 h-12">
                  <Crown className="h-5 w-5" />
                  Get Premium — $4.99/mo
                </Button>
              </Link>
              <Link href="/membership/portal">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  View Plans
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> Ad-free</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> Exclusive tunes</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> PDF downloads</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-400" /> Early access</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
