import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${SITE_CONFIG.name} — rules and guidelines for using our website and services.`,
  alternates: { canonical: `${SITE_CONFIG.url}/terms-of-service` },
}

export default function TermsPage() {
  return (
    <div className="container-custom py-16 max-w-3xl">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: May 15, 2026</p>

      <div className="prose-custom space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing {SITE_CONFIG.name}, you agree to these Terms of Service.
            If you do not agree, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. Content Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            {SITE_CONFIG.name} is an unofficial fan resource and is not affiliated with, endorsed by,
            or connected to Microsoft, Turn 10 Studios, or Playground Games. All game-related trademarks,
            logos, and assets are property of their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials.
            We reserve the right to suspend or terminate accounts that violate these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. Membership & Payments</h2>
          <p className="text-muted-foreground leading-relaxed">
            Premium memberships are billed through Stripe. You may cancel at any time.
            Refund requests are handled on a case-by-case basis. Contact us for billing issues.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            All original content on {SITE_CONFIG.name} — including guides, tuning presets, and tools —
            is our intellectual property. You may not reproduce or redistribute our content without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            {SITE_CONFIG.name} is provided &quot;as is&quot;. We make no warranties regarding the accuracy
            or availability of our content and services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">7. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions? Contact us at{' '}
            <a href="mailto:contact@fh6tools.com" className="text-brand-400 hover:text-brand-300 underline">contact@fh6tools.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
