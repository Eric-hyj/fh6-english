import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All FH6 Guides — Expert Tips, Tuning & Collectibles',
  description: 'Browse expert-written FH6 guides covering beginner tips, car tuning, collectibles, achievements, and racing strategies. Updated daily.',
  alternates: { canonical: 'https://fh6-english.vercel.app/guides' },
  openGraph: {
    title: 'All FH6 Guides — Expert Tips, Tuning & Collectibles',
    description: 'Browse expert-written FH6 guides covering beginner tips, car tuning, collectibles, achievements, and racing strategies.',
  },
}

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
