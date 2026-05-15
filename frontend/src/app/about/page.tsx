import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { BookOpen, Wrench, MapPin, Trophy, Swords } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About FH6 Guide',
  description: `About ${SITE_CONFIG.name} — the ultimate Forza Horizon 6 resource built by players, for players.`,
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
}

const highlights = [
  { icon: BookOpen, title: 'Expert Guides', desc: 'Detailed walkthroughs covering beginner tips, car builds, racing strategies, collectibles hunting, and achievement guides.' },
  { icon: Wrench, title: 'Tuning Calculator', desc: 'Professional-grade tuning presets for Road Racing, Drift, Offroad, and Drag — built with real Forza community meta parameters.' },
  { icon: MapPin, title: 'Interactive Map', desc: 'Explore every landmark, Barn Find, treasure car, circuit, and car meet across the Japan map with our interactive collectibles tracker.' },
  { icon: Trophy, title: 'Premium Membership', desc: 'Ad-free reading, exclusive tunes, PDF downloads, and priority support for the ultimate FH6 experience.' },
]

export default function AboutPage() {
  return (
    <div className="container-custom py-16">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600">
            <Swords className="h-6 w-6 text-white" />
          </div>
          <span className="text-3xl font-extrabold">
            <span className="gradient-text">FH6</span>
            <span> Guide</span>
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-4">About FH6 Guide</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {SITE_CONFIG.name} is the most comprehensive Forza Horizon 6 resource on the web.
          Built by dedicated FH6 players, we provide expert guides, tuning tools, interactive maps,
          and a premium membership experience — all designed to help you master every aspect of the game.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
        {highlights.map((item) => (
          <div key={item.title} className="flex gap-4 p-6 rounded-xl border border-border bg-card/50">
            <item.icon className="h-6 w-6 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto text-center p-8 rounded-xl bg-brand-600/5 border border-brand-600/10 mb-16">
        <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          We believe every FH6 player deserves access to high-quality, accurate, and up-to-date information.
          Whether you&apos;re hunting for your first Barn Find, perfecting a drift tune, or racing to complete
          every achievement — {SITE_CONFIG.name} is your companion on the roads of Japan.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to master FH6?</h2>
        <p className="text-muted-foreground mb-6">Join thousands of players using FH6 Guide.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/guides"><Button>Browse Guides</Button></Link>
          <Link href="/membership/register"><Button variant="gold">Join Premium</Button></Link>
        </div>
      </div>
    </div>
  )
}
