'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Crown, Check, ArrowRight, Star, Shield, Download, Zap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with basic guides and tools.',
    features: ['Basic guides access', 'Basic tuning calculator', 'Ad-supported experience', 'Limited collectibles map'],
    cta: 'Current Plan',
    popular: false,
    href: '/membership/register',
  },
  {
    id: 'monthly',
    name: 'Premium Monthly',
    price: '$4.99',
    period: '/month',
    description: 'Unlock the full FH6 Guide experience.',
    features: ['Ad-free browsing', 'All guides & tools', 'Exclusive tuning setups', 'PDF guide downloads', 'Priority support', 'Early access to new tools'],
    cta: 'Get Premium',
    popular: true,
    href: '/membership/register?plan=monthly',
  },
  {
    id: 'yearly',
    name: 'Premium Yearly',
    price: '$49.99',
    period: '/year',
    description: 'Best value — save 16% compared to monthly.',
    features: ['Everything in Monthly', '2 months free', 'Exclusive member badge', 'Seasonal guide packs', 'Custom tune requests'],
    cta: 'Best Value',
    popular: false,
    href: '/membership/register?plan=yearly',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$99.99',
    period: 'one-time',
    description: 'Pay once, own forever. For the dedicated FH6 player.',
    features: ['All Premium features', 'Lifetime updates', 'Custom tuning requests', 'Early beta access', 'Name in credits', 'Direct line to devs'],
    cta: 'Go Lifetime',
    popular: false,
    href: '/membership/register?plan=lifetime',
  },
]

export default function MembershipPortalPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')

  return (
    <div className="container-custom py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Crown className="h-12 w-12 mx-auto text-amber-400 mb-4" />
        <Badge variant="gold" className="mb-4">Membership</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground">Unlock the full potential of FH6 Guide. Get ad-free browsing, exclusive tools, and premium content.</p>
      </div>

      {/* Pricing Toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <button
          onClick={() => setBilling('monthly')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${billing === 'monthly' ? 'bg-brand-600 text-white' : 'bg-accent text-muted-foreground'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling('yearly')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${billing === 'yearly' ? 'bg-brand-600 text-white' : 'bg-accent text-muted-foreground'}`}
        >
          Yearly
          <Badge variant="gold" className="text-[10px]">Save 16%</Badge>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {PLANS.map((plan) => {
          const isYearlyDiscount = plan.id === 'yearly'
          const isFree = plan.id === 'free'

          return (
            <Card key={plan.id} className={`relative flex flex-col ${plan.popular ? 'border-brand-600 ring-1 ring-brand-600' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="gold" className="px-4 py-1 text-xs gap-1">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {plan.id === 'lifetime' ? <Star className="h-5 w-5 text-purple-400" /> :
                   plan.id === 'free' ? <Zap className="h-5 w-5 text-muted-foreground" /> :
                   <Crown className="h-5 w-5 text-amber-400" />}
                  {plan.name}
                </CardTitle>
                <div className="mt-3">
                  <span className="text-3xl font-bold">{isYearlyDiscount && billing === 'monthly' ? '$4.99' : plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {isFree ? '' : isYearlyDiscount && billing === 'monthly' ? '/month' : plan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {(isYearlyDiscount && billing === 'monthly'
                    ? ['Everything in Monthly', '2 months free', 'Premium badge', 'Seasonal guides', 'Custom tune requests']
                    : plan.features
                  ).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href} className="mt-6 block">
                  <Button
                    variant={plan.popular ? 'gold' : isFree ? 'outline' : 'default'}
                    className="w-full gap-2"
                    disabled={isFree}
                  >
                    {isFree ? 'Current Plan' : plan.cta}
                    {!isFree && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Features */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-xl font-bold text-center mb-8">What Premium Members Get</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Crown, title: 'Ad-Free', desc: 'No ads, no distractions. Focus on the game.' },
            { icon: Shield, title: 'Exclusive Tunes', desc: 'Pro-level tuning setups you won\'t find anywhere else.' },
            { icon: Download, title: 'PDF Downloads', desc: 'Download guides as PDFs for offline reading.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <Icon className="h-8 w-8 mx-auto text-brand-400 mb-3" />
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
