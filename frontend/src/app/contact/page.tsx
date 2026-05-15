import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { Mail, MessageCircle, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact ${SITE_CONFIG.name} — get in touch for support, feedback, or business inquiries.`,
  alternates: { canonical: `${SITE_CONFIG.url}/contact` },
}

const channels = [
  {
    icon: Mail,
    title: 'Email',
    desc: 'For general inquiries, support, and business contact.',
    link: 'mailto:contact@fh6tools.com',
    linkText: 'contact@fh6tools.com',
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    desc: 'Join our community for live help, tuning discussions, and FH6 chat.',
    link: SITE_CONFIG.social.discord,
    linkText: 'Join Discord Server',
  },
  {
    icon: ExternalLink,
    title: 'Reddit',
    desc: 'Follow us on Reddit for updates, tips, and community discussions.',
    link: SITE_CONFIG.social.reddit,
    linkText: 'r/fh6guide',
  },
]

export default function ContactPage() {
  return (
    <div className="container-custom py-16 max-w-2xl">
      <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-center">Contact Us</h1>
      <p className="text-muted-foreground text-center mb-12">
        Have a question, suggestion, or business inquiry? We&apos;d love to hear from you.
      </p>

      <div className="space-y-4">
        {channels.map((ch) => (
          <a
            key={ch.title}
            href={ch.link}
            target={ch.link.startsWith('http') ? '_blank' : undefined}
            rel={ch.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card/50 hover:border-brand-600/30 hover:bg-accent transition-colors"
          >
            <ch.icon className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">{ch.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{ch.desc}</p>
              <span className="text-sm text-brand-400 font-medium">{ch.linkText}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
