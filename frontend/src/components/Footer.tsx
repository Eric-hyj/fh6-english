import Link from 'next/link'
import { Swords, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <Swords className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">FH6</span>
                <span className="text-foreground"> Guide</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-4 mt-4">
              <a href={SITE_CONFIG.social.twitter} className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">Twitter/X</a>
              <a href={SITE_CONFIG.social.discord} className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">Discord</a>
              <a href={SITE_CONFIG.social.reddit} className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">Reddit</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Guides</h3>
            <ul className="space-y-2">
              {['Beginner Guides', 'Car Guides', 'Racing Tips', 'Collectibles', 'Achievements'].map((item) => (
                <li key={item}>
                  <Link href={`/guides?category=${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Company</h3>
            <ul className="space-y-2">
              {['About', 'Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Not affiliated with Microsoft, Turn 10, or Playground Games.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span>contact@fh6tools.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
