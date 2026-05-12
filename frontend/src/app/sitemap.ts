import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fh6tools.com'

  const guides = [
    'fh6-beginner-guide',
    'best-starter-cars-fh6',
    'unlimited-credits-fh6',
    'all-barn-finds-locations-fh6',
    'best-tuning-setup-fh6',
    'fh6-achievement-guide',
    'best-offroad-cars-fh6',
    'fast-travel-boards-fh6',
    'fh6-drift-tuning-guide',
    'fh6-season-1-challenges',
    'xp-boards-fh6',
    'fh6-wheelspin-guide',
  ]

  const staticPages = [
    '',
    '/guides',
    '/tools/tuning-calculator',
    '/tools/collectibles-map',
    '/membership/portal',
  ]

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' as const : 'daily' as const,
      priority: page === '' ? 1.0 : 0.9,
    })),
    ...guides.map((slug) => ({
      url: `${baseUrl}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
