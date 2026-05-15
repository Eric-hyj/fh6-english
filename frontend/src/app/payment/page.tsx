'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { CreditCard, Lock, Check, Shield, ArrowRight, Loader2, Crown, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test'

const PLAN_INFO: Record<string, { price: number; name: string; period: string }> = {
  monthly: { price: 4.99, name: 'Premium Monthly', period: '/month' },
  yearly: { price: 49.99, name: 'Premium Yearly', period: '/year' },
  lifetime: { price: 99.99, name: 'Lifetime', period: 'one-time' },
}

function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const plan = searchParams.get('plan') || 'monthly'
  const planInfo = PLAN_INFO[plan] || PLAN_INFO.monthly
  const [paypalError, setPaypalError] = useState('')
  const [paying, setPaying] = useState(false)

  if (!user) {
    return (
      <div className="max-w-lg mx-auto text-center">
        <Card>
          <CardContent className="py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-amber-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">Login Required</h2>
            <p className="text-muted-foreground mb-6">Please log in or create an account before making a purchase.</p>
            <Button onClick={() => router.push(`/membership/login?redirect=/payment?plan=${plan}`)}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CreditCard className="h-8 w-8 mx-auto text-brand-400 mb-2" />
          <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Secure payment powered by PayPal</p>
        </CardHeader>
        <CardContent>
          {/* Order Summary */}
          <div className="p-4 rounded-xl bg-accent mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <span className="font-medium">{planInfo.name}</span>
              </div>
              <span className="text-lg font-bold">{formatPrice(planInfo.price)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{planInfo.period}</span>
              <span>USD</span>
            </div>
            <div className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
              Logged in as <span className="text-foreground font-medium">{user.email}</span>
            </div>
          </div>

          {paypalError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive-foreground mb-4 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              {paypalError}
            </div>
          )}

          {/* PayPal Buttons */}
          <div className={paying ? 'opacity-50 pointer-events-none' : ''}>
            <PayPalButtons
              style={{ layout: 'vertical', shape: 'rect', color: 'gold', label: 'pay' }}
              createOrder={async () => {
                setPaying(true)
                setPaypalError('')
                try {
                  const token = localStorage.getItem('jwt')
                  const res = await fetch('/api/paypal/orders', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify({ plan }),
                  })
                  const data = await res.json()
                  if (data.orderId) return data.orderId
                  throw new Error(data.error || 'Failed to create order')
                } catch (e: any) {
                  setPaypalError(e.message)
                  setPaying(false)
                  throw e
                }
              }}
              onApprove={async (data) => {
                try {
                  const token = localStorage.getItem('jwt')
                  const res = await fetch('/api/paypal/orders', {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify({ orderId: data.orderID, plan }),
                  })
                  const result = await res.json()
                  if (result.success) {
                    router.push('/membership/portal?payment=success')
                  } else {
                    setPaypalError(`Payment capture failed: ${result.error || 'Unknown error'}`)
                    setPaying(false)
                  }
                } catch (e: any) {
                  setPaypalError(e.message)
                  setPaying(false)
                }
              }}
              onCancel={() => {
                setPaying(false)
                setPaypalError('Payment was cancelled.')
              }}
              onError={(err) => {
                setPaying(false)
                setPaypalError(`PayPal error: ${err?.toString() || 'Unknown error'}`)
              }}
            />
          </div>

          {paying && (
            <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing payment...
            </div>
          )}

          {/* Security badges */}
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Secure payment</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> PayPal protected</span>
          </div>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              By purchasing, you agree to our{' '}
              <a href="/terms-of-service" className="text-brand-400 hover:text-brand-300">Terms of Service</a> and{' '}
              <a href="/privacy-policy" className="text-brand-400 hover:text-brand-300">Privacy Policy</a>.
              Cancel anytime from your account settings.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Accepted payment methods */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground mb-3">Accepted payment methods</p>
        <div className="flex justify-center gap-4 text-muted-foreground">
          <span className="text-sm font-semibold">PayPal</span>
          <span className="text-sm font-semibold">VISA</span>
          <span className="text-sm font-semibold">Mastercard</span>
          <span className="text-sm font-semibold">AMEX</span>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <div className="container-custom py-16">
      <Suspense fallback={<div className="text-center text-muted-foreground">Loading payment...</div>}>
        <PayPalScriptProvider options={{
          clientId: PAYPAL_CLIENT_ID,
          currency: 'USD',
          intent: 'capture',
        }}>
          <PaymentContent />
        </PayPalScriptProvider>
      </Suspense>
    </div>
  )
}
