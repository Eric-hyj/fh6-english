'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full gap-2" type="button" onClick={loginWithGoogle}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full gap-2" type="button">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#5865F2"><path d="M18.942 5.922a14.814 14.814 0 00-2.549-.789.062.062 0 00-.063.023 10.561 10.561 0 00-.663 1.363 14.823 14.823 0 00-4.496 0 9.523 9.523 0 00-.668-1.363.066.066 0 00-.062-.023 14.718 14.718 0 00-2.55.79.061.061 0 00-.028.025C4.386 10.124 3.694 13.69 4.03 17.197a.077.077 0 00.028.054c1.666 1.223 3.278 1.965 4.86 2.454a.068.068 0 00.068-.023 10.616 10.616 0 001.302-2.547.066.066 0 00-.036-.087 9.845 9.845 0 01-1.921-.915.065.065 0 010-.116 6.98 6.98 0 00.38-.299.067.067 0 01.07-.01c2.066.951 4.308.951 6.335 0a.068.068 0 01.07.01c.119.1.249.2.38.299a.064.064 0 010 .115 9.84 9.84 0 01-1.922.916.068.068 0 00-.035.087 10.59 10.59 0 001.302 2.547c.015.02.04.026.069.023 1.586-.49 3.198-1.231 4.86-2.454a.069.069 0 00.028-.054c.404-3.977-.64-7.514-2.684-11.25a.056.056 0 00-.029-.025zm-5.346 9.018c-.792 0-1.44-.728-1.44-1.622 0-.893.633-1.622 1.44-1.622.807 0 1.44.729 1.44 1.622 0 .894-.64 1.622-1.44 1.622zm3.917 0c-.792 0-1.44-.728-1.44-1.622 0-.893.633-1.622 1.44-1.622.807 0 1.44.729 1.44 1.622 0 .894-.64 1.622-1.44 1.622z"/></svg>
                  Discord
                </Button>
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
