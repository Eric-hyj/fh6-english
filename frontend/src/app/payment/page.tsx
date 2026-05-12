'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CreditCard, Lock, Check, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

const PLAN_PRICES: Record<string, number> = {
  monthly: 4.99,
  yearly: 49.99,
  lifetime: 99.99,
}

function PaymentContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'monthly'
  const price = PLAN_PRICES[plan] || 4.99
  const [loading, setLoading] = useState(false)

  const planName = plan === 'yearly' ? 'Premium Yearly' : plan === 'lifetime' ? 'Lifetime' : 'Premium Monthly'

  async function handleCheckout() {
    setLoading(true)
    try {
      // In production: call Stripe Checkout API
      await new Promise((r) => setTimeout(r, 2000))
      alert('Payment successful! (Demo)')
    } catch {
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CreditCard className="h-8 w-8 mx-auto text-brand-400 mb-2" />
          <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Secure payment powered by Stripe</p>
        </CardHeader>
        <CardContent>
          {/* Order Summary */}
          <div className="p-4 rounded-xl bg-accent mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{planName}</span>
              <span className="text-lg font-bold">{formatPrice(price)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-green-400" />
              {plan === 'lifetime' ? 'One-time payment' : 'Auto-renews monthly'}
            </div>
          </div>

          {/* Payment Button */}
          <Button onClick={handleCheckout} disabled={loading} variant="gold" className="w-full text-base py-6 gap-2">
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Pay {formatPrice(price)} — {planName}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          {/* Security badges */}
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Secure payment</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> Stripe protected</span>
          </div>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              By purchasing, you agree to our{' '}
              <a href="/terms" className="text-brand-400 hover:text-brand-300">Terms of Service</a> and{' '}
              <a href="/privacy" className="text-brand-400 hover:text-brand-300">Privacy Policy</a>.
              Cancel anytime from your account settings.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Accepted payment methods */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground mb-3">Accepted payment methods</p>
        <div className="flex justify-center gap-4 text-muted-foreground">
          <span className="text-sm font-semibold">VISA</span>
          <span className="text-sm font-semibold">Mastercard</span>
          <span className="text-sm font-semibold">AMEX</span>
          <span className="text-sm font-semibold">PayPal</span>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <div className="container-custom py-16">
      <Suspense fallback={<div className="text-center text-muted-foreground">Loading payment...</div>}>
        <PaymentContent />
      </Suspense>
    </div>
  )
}
