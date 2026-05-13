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
  loginWithGoogle: (credential: string) => Promise<{ error?: string }>
}

const AuthContext = createContext<AuthContextType | null>(null)

const JWT_KEY = 'jwt'

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

  const saveAuth = useCallback((token: string, userData: User) => {
    localStorage.setItem(JWT_KEY, token)
    setUser(userData)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await authAPI.login({ identifier: email, password })
      saveAuth(res.jwt, {
        id: res.user.id,
        username: res.user.username,
        email: res.user.email,
        provider: res.user.provider,
      })
      return {}
    } catch (err: any) {
      return { error: err.message || 'Login failed' }
    }
  }, [saveAuth])

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      const res = await authAPI.register({ username, email, password })
      saveAuth(res.jwt, {
        id: res.user.id,
        username: res.user.username,
        email: res.user.email,
        provider: res.user.provider,
      })
      return {}
    } catch (err: any) {
      return { error: err.message || 'Registration failed' }
    }
  }, [saveAuth])

  const loginWithGoogle = useCallback(async (credential: string) => {
    try {
      // 解码 Google JWT 获取用户信息
      const payload = JSON.parse(atob(credential.split('.')[1]))
      const { email, name, sub } = payload
      // 生成确定性密码（Google 用户通过 Google 认证，不需要记密码）
      const googlePwd = `google_${sub.substring(0, 20)}!`

      try {
        // 先尝试注册
        const res = await authAPI.register({ username: name, email, password: googlePwd })
        saveAuth(res.jwt, {
          id: res.user.id,
          username: res.user.username,
          email: res.user.email,
          provider: 'google',
        })
      } catch {
        // 用户已存在，尝试登录
        const res = await authAPI.login({ identifier: email, password: googlePwd })
        saveAuth(res.jwt, {
          id: res.user.id,
          username: res.user.username,
          email: res.user.email,
          provider: 'google',
        })
      }
      return {}
    } catch (err: any) {
      return { error: 'Google login failed. Please try again.' }
    }
  }, [saveAuth])

  const logout = useCallback(() => {
    localStorage.removeItem(JWT_KEY)
    setUser(null)
    router.push('/')
  }, [router])

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
