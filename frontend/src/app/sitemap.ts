import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fh6-english-production.up.railway.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url

  // 动态从 Strapi 获取真实文章 slug
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
    // Strapi 挂了就只用静态页面，总比塞一堆 404 强
  }

  const staticPages = [
    { path: '', changefreq: 'weekly' as const, priority: 1.0 },
    { path: '/guides', changefreq: 'daily' as const, priority: 0.9 },
    { path: '/tools/tuning-calculator', changefreq: 'daily' as const, priority: 0.9 },
    { path: '/tools/collectibles-map', changefreq: 'daily' as const, priority: 0.9 },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = staticPages.map(({ path, changefreq, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changefreq,
    priority,
  }))

  for (const slug of guideSlugs) {
    sitemapEntries.push({
      url: `${baseUrl}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  }

  return sitemapEntries
}
