'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Strapi 在 OAuth 成功后将 JWT 通过 URL query 参数传回来
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get('access_token')

    if (accessToken) {
      localStorage.setItem('jwt', accessToken)
      // 触发 AuthContext 更新
      window.dispatchEvent(new Event('auth-change'))
      router.replace('/membership/portal')
    } else {
      // 认证失败，回登录页
      router.replace('/membership/login?error=oauth_failed')
    }
  }, [router])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand-400 mx-auto mb-4" />
        <p className="text-muted-foreground">Completing login...</p>
      </div>
    </div>
  )
}
