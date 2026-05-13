import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, TrendingUp, Share2, BookOpen, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://fh6-english-production.up.railway.app'

type GuideData = {
  id: number
  title: string
  slug: string
  category: string
  content: string
  excerpt: string
  reads: number
  author: string
  publishedAt: string
  related?: { id: number; title: string; slug: string }[]
}

async function fetchGuide(slug: string): Promise<GuideData | null> {
  try {
    const res = await fetch(
      `${API_BASE}/api/guides?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    const json = await res.json()
    if (!json.data || json.data.length === 0) return null
    const item = json.data[0]
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      category: item.category,
      content: item.content,
      excerpt: item.excerpt,
      reads: item.reads,
      author: item.author,
      publishedAt: item.publishedAt,
      related: item.related?.map((r: any) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
      })),
    }
  } catch {
    return null
  }
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

function renderMarkdown(md: string) {
  const lines = md.split('\n')
  const html = lines.map((line) => {
    if (line.startsWith('## ')) return `<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">${line.slice(3)}</h2>`
    if (line.startsWith('### ')) return `<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">${line.slice(4)}</h3>`
    // Image syntax: ![alt](url)
    const imgMatch = line.match(/^!\[(.+?)\]\((.+?)\)$/)
    if (imgMatch) return `<figure class="my-6"><img src="${imgMatch[2]}" alt="${imgMatch[1]}" class="rounded-lg w-full" loading="lazy" /><figcaption class="text-sm text-muted-foreground mt-2 text-center">${imgMatch[1]}</figcaption></figure>`
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
  const guide = await fetchGuide(params.slug)
  if (!guide) notFound()

  return (
    <div className="container-custom py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/guides" className="hover:text-foreground">Guides</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground truncate max-w-[200px]">{guide.title}</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-10">
        {/* Main Content */}
        <article>
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to guides
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">{guide.category}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {formatDate(guide.publishedAt)}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> {formatReads(guide.reads)} reads
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              {guide.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>By {guide.author}</span>
              <span className="text-border">|</span>
              <span>8 min read</span>
            </div>
          </header>

          <div
            className="prose-custom max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(guide.content) }}
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
          {guide.related && guide.related.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Related Guides</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 space-y-3">
                {guide.related.map((r) => (
                  <Link key={r.slug} href={`/guides/${r.slug}`}>
                    <div className="group flex items-start gap-2 p-2 rounded-lg hover:bg-accent transition-colors">
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-brand-400 transition-colors" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{r.title}</span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

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
