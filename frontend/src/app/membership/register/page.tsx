'use client'

import { Suspense, useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { GoogleLogin } from '@react-oauth/google'
import { Loader2, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || ''
  const { register, loginWithGoogle } = useAuth()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await register(username, email, password)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else if (plan) {
      router.push(`/payment?plan=${plan}`)
    } else {
      router.push('/membership/portal')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <UserPlus className="h-8 w-8 mx-auto text-brand-400 mb-2" />
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Join the FH6 Guide community</p>
        </CardHeader>
        <CardContent>
          {plan && (
            <div className="p-3 mb-6 rounded-lg bg-amber-600/10 border border-amber-600/30 text-sm text-center text-amber-400">
              You&apos;ll choose your membership plan after registration
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive-foreground">{error}</div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Username</label>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Your gamertag" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="At least 6 characters" />
            </div>

            <Button type="submit" disabled={loading} className="w-full gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">Or sign up with</span></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (credentialResponse.credential) {
                    setError('')
                    const result = await loginWithGoogle(credentialResponse.credential)
                    if (result.error) {
                      setError(result.error)
                    } else if (plan) {
                      router.push(`/payment?plan=${plan}`)
                    } else {
                      router.push('/membership/portal')
                    }
                  }
                }}
                onError={() => setError('Google login failed.')}
                size="large"
                theme="filled_black"
                text="signup_with"
                shape="rectangular"
                width="320"
              />
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link href="/membership/login" className="text-brand-400 hover:text-brand-300 font-medium">Log in</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <div className="container-custom py-16">
      <Suspense fallback={<div className="max-w-md mx-auto text-center text-muted-foreground">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  )
}
