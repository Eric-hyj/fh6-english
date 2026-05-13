'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GoogleLogin } from '@react-oauth/google'
import { Loader2, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login, loginWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      router.push('/membership/portal')
    }
  }

  return (
    <div className="container-custom py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <LogIn className="h-8 w-8 mx-auto text-brand-400 mb-2" />
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Log in to your FH6 Guide account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive-foreground">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Password</label>
                  <Link href="/membership/forgot-password" className="text-xs text-brand-400 hover:text-brand-300">Forgot?</Link>
                </div>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
              </div>

              <Button type="submit" disabled={loading} className="w-full gap-2">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? 'Logging in...' : 'Log In'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    if (credentialResponse.credential) {
                      setError('')
                      const result = await loginWithGoogle(credentialResponse.credential)
                      if (result.error) {
                        setError(result.error)
                      } else {
                        router.push('/membership/portal')
                      }
                    }
                  }}
                  onError={() => setError('Google login failed. Please try again.')}
                  size="large"
                  theme="filled_black"
                  text="signin_with"
                  shape="rectangular"
                  width="320"
                />
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{' '}
                <Link href="/membership/register" className="text-brand-400 hover:text-brand-300 font-medium">Sign up</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
