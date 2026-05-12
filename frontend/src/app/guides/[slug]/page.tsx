import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, TrendingUp, Share2, BookOpen, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// This would come from CMS in production
const MOCK_GUIDE = {
  title: 'FH6 Beginner Guide: Everything You Need to Know',
  category: 'beginner',
  date: 'May 15, 2026',
  reads: '12.4k',
  author: 'FH6 Guide Team',
  content: `
## Welcome to Forza Horizon 6

Forza Horizon 6 is here, and it's bigger than ever. Whether you're a veteran of the series or a complete newcomer, this guide will help you hit the ground running.

## Getting Started

### Choose Your First Car Wisely

Your first car choice matters more than you think. While it's tempting to pick the flashiest option, we recommend choosing a versatile vehicle that can handle multiple race types.

**Top starter picks:**
- **Toyota GR Supra 2025** — Best all-rounder for early game
- **Honda Civic Type R** — Excellent handling, great for street races
- **Ford Focus RS** — Perfect for mixed terrain events

### Understanding the Map

The FH6 map is divided into several distinct biomes. Each area has unique events, collectibles, and driving conditions. Spend your first hour exploring and unlocking fast travel points.

### Master the Basics

Before diving into competitive racing, spend time in the Festival Playlist to learn:
- Braking points and racing lines
- Drift mechanics
- Off-road driving techniques
- Car customization basics

## Pro Tips for New Players

1. **Complete the intro festival** before exploring — unlocks core features
2. **Save your credits** for a second car rather than upgrading your first
3. **Join a club** early for bonus XP and credits
4. **Set waypoints** for fast travel board locations
5. **Check the Festival Playlist** daily for limited-time rewards

## Common Questions

**Q: What's the fastest way to earn credits?**
A: Complete the Festival Playlist events and auction duplicate cars.

**Q: Should I buy or earn cars?**
A: Earn what you can through races, buy only when necessary for specific events.

**Q: Is the VIP membership worth it?**
A: Yes, if you plan to play more than 20 hours — the double credit bonus pays for itself.
`,
  related: [
    { title: 'Best Starter Cars in Forza Horizon 6', slug: 'best-starter-cars-fh6' },
    { title: 'How to Get Unlimited Credits Fast in FH6', slug: 'unlimited-credits-fh6' },
    { title: 'All Barn Finds Locations Guide', slug: 'all-barn-finds-locations-fh6' },
  ],
}

function renderMarkdown(md: string) {
  const lines = md.split('\n')
  const html = lines.map((line) => {
    if (line.startsWith('## ')) return `<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">${line.slice(3)}</h2>`
    if (line.startsWith('### ')) return `<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">${line.slice(4)}</h3>`
    if (line.startsWith('**') && line.endsWith('**')) return `<p class="font-bold text-foreground mt-4 mb-2">${line.slice(2, -2)}</p>`
    if (line.startsWith('- **')) {
      const match = line.match(/- \*\*(.+?)\*\*(.*)/)
      if (match) return `<li class="ml-6 mb-2 text-foreground/90"><strong>${match[1]}</strong>${match[2]}</li>`
    }
    if (line.startsWith('- ')) return `<li class="ml-6 mb-2 text-foreground/90">${line.slice(2)}</li>`
    if (line.startsWith('**Q:')) {
      const match = line.match(/\*\*Q: (.+)\*\*/)
      if (match) return `<p class="font-semibold text-foreground mt-4">Q: ${match[1]}</p>`
    }
    if (line.startsWith('A:')) return `<p class="ml-4 mb-3 text-foreground/80">${line}</p>`
    if (line.trim() === '') return ''
    return `<p class="mb-3 text-foreground/90 leading-7">${line}</p>`
  })
  return html.join('\n')
}

export default async function GuideDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  // In production, fetch from Strapi CMS
  if (!MOCK_GUIDE) notFound()

  return (
    <div className="container-custom py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/guides" className="hover:text-foreground">Guides</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground truncate max-w-[200px]">{MOCK_GUIDE.title}</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-10">
        {/* Main Content */}
        <article>
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to guides
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">{MOCK_GUIDE.category}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {MOCK_GUIDE.date}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> {MOCK_GUIDE.reads} reads
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              {MOCK_GUIDE.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>By {MOCK_GUIDE.author}</span>
              <span className="text-border">|</span>
              <span>8 min read</span>
            </div>
          </header>

          <div
            className="prose-custom max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(MOCK_GUIDE.content) }}
          />

          {/* Share */}
          <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border">
            <span className="text-sm text-muted-foreground">Share this guide:</span>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Share2 className="h-3.5 w-3.5" /> Share
            </Button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Related Guides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Related Guides</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-3">
              {MOCK_GUIDE.related.map((r) => (
                <Link key={r.slug} href={`/guides/${r.slug}`}>
                  <div className="group flex items-start gap-2 p-2 rounded-lg hover:bg-accent transition-colors">
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-brand-400 transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{r.title}</span>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Premium CTA */}
          <Card className="bg-gradient-to-br from-brand-600/10 via-amber-600/5 to-card border-brand-600/20">
            <CardContent className="text-center">
              <h3 className="text-lg font-bold mb-2">Unlock Premium</h3>
              <p className="text-sm text-muted-foreground mb-4">Get ad-free reading, exclusive guides, and PDF downloads.</p>
              <Link href="/membership/register">
                <Button variant="gold" size="sm" className="w-full">Upgrade Now</Button>
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
