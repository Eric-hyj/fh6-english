import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FH6 Japan Interactive Collectibles Map — All POIs & Locations',
  description: 'Explore every landmark, touge pass, barn find, treasure car, circuit, and car meet across Japan. Track your FH6 discovery progress with interactive map.',
  alternates: { canonical: 'https://fh6guide.com/tools/collectibles-map' },
  openGraph: {
    title: 'FH6 Japan Interactive Collectibles Map — All POIs & Locations',
    description: 'Explore every landmark, touge pass, barn find, treasure car, circuit, and car meet across Japan.',
  },
}

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
