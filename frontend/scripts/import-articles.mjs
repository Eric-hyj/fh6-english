/**
 * 导入本地文章 JSON 到 Strapi CMS
 *
 * 用法:
 *   STRAPI_TOKEN=xxx node scripts/import-articles.mjs
 *
 * 获取 Token:
 *   Strapi Admin → Settings → API Tokens → Create new → Full access
 */
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const STRAPI_URL = process.env.STRAPI_URL || 'https://fh6-english-production.up.railway.app'
const TOKEN = process.env.STRAPI_TOKEN || ''
const CONTENT_DIR = join(process.cwd(), 'content')

if (!TOKEN) {
  console.error('ERROR: 请设置 STRAPI_TOKEN 环境变量')
  console.error('  STRAPI_TOKEN=xxx node scripts/import-articles.mjs')
  process.exit(1)
}

const files = (await readdir(CONTENT_DIR)).filter(f => f.endsWith('.json'))
console.log(`准备导入 ${files.length} 篇文章到 ${STRAPI_URL}\n`)

let success = 0, skip = 0, fail = 0

for (let i = 0; i < files.length; i++) {
  const article = JSON.parse(await readFile(join(CONTENT_DIR, files[i]), 'utf-8'))
  const payload = {
    data: {
      title: article.title,
      slug: article.slug,
      category: article.category,
      content: article.content,
      excerpt: article.excerpt,
      author: article.author || 'FH6 Guide Team',
    },
  }

  try {
    const resp = await fetch(`${STRAPI_URL}/api/guides`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000),
    })

    if (resp.ok) {
      console.log(`  [${i + 1}/${files.length}] OK  ${article.title.slice(0, 65)}`)
      success++
    } else {
      const err = await resp.json().catch(() => ({}))
      const msg = err.error?.message || resp.statusText
      if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('duplicate')) {
        console.log(`  [${i + 1}/${files.length}] DUP ${article.title.slice(0, 65)}`)
        skip++
      } else {
        console.log(`  [${i + 1}/${files.length}] ERR ${resp.status} ${article.title.slice(0, 65)} — ${msg}`)
        fail++
      }
    }
  } catch (e) {
    if (e.cause?.code === 'ECONNREFUSED' || e.message?.includes('fetch')) {
      console.log(`  [${i + 1}/${files.length}] CONNECTION ERROR — Strapi 可能休眠中`)
      console.log('  等待 Railway 唤醒后重试')
    } else {
      console.log(`  [${i + 1}/${files.length}] ERROR ${article.title.slice(0, 65)} — ${e.message}`)
    }
    fail++
  }

  // 小延迟避免打爆 API
  await new Promise(r => setTimeout(r, 300))
}

console.log(`\n=== 导入完成: ${success} 成功, ${skip} 已存在, ${fail} 失败 ===`)
