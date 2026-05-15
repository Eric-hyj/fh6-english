import { NextRequest, NextResponse } from 'next/server'

const PAYPAL_API = process.env.PAYPAL_LIVE
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || ''

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fh6-english-production.up.railway.app'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''

const PLAN_PRICES: Record<string, { amount: string; name: string }> = {
  monthly: { amount: '4.99', name: 'Premium Monthly' },
  yearly: { amount: '49.99', name: 'Premium Yearly' },
  lifetime: { amount: '99.99', name: 'Lifetime' },
}

// 获取 PayPal Access Token
async function getPayPalToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')
  console.log('[PAYPAL] Requesting token with API:', PAYPAL_API)
  console.log('[PAYPAL] Client ID prefix:', PAYPAL_CLIENT_ID.substring(0, 10))
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  console.log('[PAYPAL] Token response status:', res.status)
  if (!data.access_token) {
    console.error('[PAYPAL] Token error:', JSON.stringify(data))
  }
  return data.access_token
}

// 从 JWT 获取 Strapi 用户 ID
async function getStrapiUserId(jwt: string): Promise<{ id: number; email: string; username: string } | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    if (!res.ok) return null
    const data = await res.json()
    return { id: data.id, email: data.email, username: data.username }
  } catch {
    return null
  }
}

// 记录支付信息（等 Strapi membership 内容类型创建后启用）
async function recordPayment(user: { id: number; email: string }, plan: string, paypalOrderId: string) {
  const planInfo = PLAN_PRICES[plan] || PLAN_PRICES.monthly
  const endDate = new Date()
  if (plan === 'monthly') endDate.setMonth(endDate.getMonth() + 1)
  else if (plan === 'yearly') endDate.setFullYear(endDate.getFullYear() + 1)
  else if (plan === 'lifetime') endDate.setFullYear(endDate.getFullYear() + 100)

  // 等用户在 Strapi 后台创建 Membership 内容类型后取消注释
  // try {
  //   await fetch(`${STRAPI_URL}/api/memberships`, {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${STRAPI_TOKEN}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       data: {
  //         user: user.id,
  //         plan,
  //         planName: planInfo.name,
  //         amount: parseFloat(planInfo.amount),
  //         paypalOrderId,
  //         startDate: new Date().toISOString(),
  //         endDate: endDate.toISOString(),
  //         active: true,
  //       },
  //     }),
  //   })
  //   console.log(`Membership created for user ${user.id}: plan=${plan}, order=${paypalOrderId}`)
  // } catch (e) {
  //   console.error('Failed to create membership record:', e)
  //   throw e
  // }

  console.log(`[PAYPAL] Payment received: user=${user.email}, plan=${plan}, amount=${planInfo.amount}, order=${paypalOrderId}`)
}

// POST - 创建 PayPal 订单
export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json()
    const planInfo = PLAN_PRICES[plan]
    if (!planInfo) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const token = await getPayPalToken()
    if (!token) {
      console.error('[PAYPAL] Failed to get access token')
      return NextResponse.json({ error: 'PayPal authentication failed' }, { status: 500 })
    }
    console.log('[PAYPAL] Got access token:', token.substring(0, 10) + '...')

    const orderBody = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: planInfo.amount,
        },
        description: `FH6 Guide - ${planInfo.name}`,
      }],
    }
    console.log('[PAYPAL] Creating order:', JSON.stringify(orderBody))

    const order = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderBody),
    })
    const orderData = await order.json()
    console.log('[PAYPAL] Order response status:', order.status)
    console.log('[PAYPAL] Order response:', JSON.stringify(orderData).substring(0, 500))

    if (orderData.id) {
      return NextResponse.json({ orderId: orderData.id })
    }
    return NextResponse.json({ error: 'Failed to create order', details: orderData }, { status: 500 })
  } catch (e: any) {
    console.error('[PAYPAL] Create order error:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// PUT - 捕获已批准的 PayPal 订单
export async function PUT(req: NextRequest) {
  try {
    const { orderId, plan } = await req.json()
    const jwt = req.headers.get('Authorization')?.replace('Bearer ', '')

    if (!orderId || !plan) {
      return NextResponse.json({ error: 'Missing orderId or plan' }, { status: 400 })
    }

    let user: { id: number; email: string; username: string } | null = null
    if (jwt) {
      user = await getStrapiUserId(jwt)
    }

    const token = await getPayPalToken()
    const capture = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    const captureData = await capture.json()

    if (captureData.status === 'COMPLETED') {
      if (user) {
        await recordPayment(user, plan, orderId)
      }

      return NextResponse.json({
        success: true,
        transactionId: captureData.id,
        payerEmail: captureData.payer?.email_address,
      })
    }

    return NextResponse.json({ error: 'Payment not completed', status: captureData.status }, { status: 402 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
