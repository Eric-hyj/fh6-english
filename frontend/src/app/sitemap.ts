import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fh6-english-production.up.railway.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url

  let guideSlugs: string[] = []
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(
      `${STRAPI_URL}/api/guides?fields[0]=slug&pagination[pageSize]=100`,
      { signal: controller.signal, next: { revalidate: 3600 } }
    )
    clearTimeout(timeout)
    if (res.ok) {
      const json = await res.json()
      guideSlugs = (json.data || []).map((item: any) => item.slug).filter(Boolean)
    }
  } catch {
    // Strapi 挂了就只用静态页面
  }

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/tuning-calculator`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/collectibles-map`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  for (const slug of guideSlugs) {
    entries.push({
      url: `${baseUrl}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  return entries
}
