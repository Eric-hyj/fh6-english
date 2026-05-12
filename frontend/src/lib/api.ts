const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://fh6-english-production.up.railway.app'

async function fetchAPI<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}/api${endpoint}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'API request failed' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }

  return res.json()
}

// ─── Guides API ───
export const guidesAPI = {
  list: (params?: { category?: string; page?: number; pageSize?: number }) => {
    const query = new URLSearchParams()
    if (params?.category) query.set('filters[category][$eq]', params.category)
    if (params?.page) query.set('pagination[page]', String(params.page))
    if (params?.pageSize) query.set('pagination[pageSize]', String(params.pageSize))
    query.set('populate', '*')
    return fetchAPI(`/guides?${query.toString()}`)
  },
  getBySlug: (slug: string) => fetchAPI(`/guides?filters[slug][$eq]=${slug}&populate=*`),
  getById: (id: number) => fetchAPI(`/guides/${id}?populate=*`),
}

// ─── Auth API ───
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    fetchAPI('/auth/local/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { identifier: string; password: string }) =>
    fetchAPI('/auth/local', { method: 'POST', body: JSON.stringify(data) }),
  me: () => fetchAPI('/users/me?populate=role'),
}

// ─── Membership API ───
export const membershipAPI = {
  createCheckoutSession: (planId: string) =>
    fetchAPI<{ sessionUrl: string }>('/membership/create-checkout', {
      method: 'POST',
      body: JSON.stringify({ planId }),
    }),
  getSubscription: () => fetchAPI('/membership/subscription'),
  cancelSubscription: () =>
    fetchAPI('/membership/subscription', { method: 'DELETE' }),
}

// ─── Tuning Presets API ───
export const tuningAPI = {
  list: (params?: { vehicle?: string }) => {
    const query = new URLSearchParams()
    if (params?.vehicle) query.set('filters[vehicle][$eq]', params.vehicle)
    query.set('populate', '*')
    return fetchAPI(`/tuning-presets?${query.toString()}`)
  },
  save: (data: { name: string; vehicle: string; buildType: string; settings: Record<string, any> }) =>
    fetchAPI('/tuning-presets', { method: 'POST', body: JSON.stringify({ data }) }),
}

export const api = {
  guides: guidesAPI,
  auth: authAPI,
  membership: membershipAPI,
  tuning: tuningAPI,
}
