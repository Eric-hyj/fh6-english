'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'

type User = {
  id: number
  username: string
  email: string
  provider?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (username: string, email: string, password: string) => Promise<{ error?: string }>
  logout: () => void
  loginWithGoogle: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const JWT_KEY = 'jwt'
const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fh6-english-production.up.railway.app'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 初始化：检查 localStorage 中的 JWT，获取用户信息
  useEffect(() => {
    const token = localStorage.getItem(JWT_KEY)
    if (!token) {
      setLoading(false)
      return
    }
    authAPI.me()
      .then((res: any) => {
        setUser({
          id: res.id,
          username: res.username,
          email: res.email,
          provider: res.provider,
        })
      })
      .catch(() => {
        localStorage.removeItem(JWT_KEY)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await authAPI.login({ identifier: email, password })
      const token = res.jwt
      localStorage.setItem(JWT_KEY, token)
      setUser({
        id: res.user.id,
        username: res.user.username,
        email: res.user.email,
        provider: res.user.provider,
      })
      return {}
    } catch (err: any) {
      return { error: err.message || 'Login failed' }
    }
  }, [])

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      const res = await authAPI.register({ username, email, password })
      const token = res.jwt
      localStorage.setItem(JWT_KEY, token)
      setUser({
        id: res.user.id,
        username: res.user.username,
        email: res.user.email,
        provider: res.user.provider,
      })
      return {}
    } catch (err: any) {
      return { error: err.message || 'Registration failed' }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(JWT_KEY)
    setUser(null)
    router.push('/')
  }, [router])

  const loginWithGoogle = useCallback(() => {
    // 重定向到 Strapi 的 Google OAuth 端点
    window.location.href = `${STRAPI_URL}/api/connect/google`
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
