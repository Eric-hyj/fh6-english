import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE_CONFIG.name} — learn how we collect, use, and protect your data.`,
  alternates: { canonical: `${SITE_CONFIG.url}/privacy-policy` },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container-custom py-16 max-w-3xl">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: May 15, 2026</p>

      <div className="prose-custom space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            When you register an account on {SITE_CONFIG.name}, we collect your email address and username.
            We do not collect passwords — authentication is handled securely via Strapi CMS with encrypted credentials.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. Cookies & Tracking Technologies</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use Google Analytics to understand how visitors use our site. Google Analytics uses cookies to collect
            anonymous usage data including pages visited, time on site, and referring URLs. No personally identifiable
            information is collected by Google Analytics.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior
            visits to our website and other sites. You may opt out of personalized advertising by visiting{' '}
            <a href="https://adssettings.google.com" className="text-brand-400 hover:text-brand-300 underline" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>To provide and maintain your member account</li>
            <li>To process membership payments via Stripe</li>
            <li>To send important account notifications</li>
            <li>To improve our content and website experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the following third-party services that may collect data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
            <li><strong>Stripe</strong> — Payment processing for membership subscriptions</li>
            <li><strong>Google Analytics</strong> — Website traffic analysis</li>
            <li><strong>Google AdSense</strong> — Advertisement delivery</li>
            <li><strong>Cloudinary</strong> — Image hosting and delivery</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. Data Protection</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement industry-standard security measures to protect your personal information.
            Payments are processed entirely by Stripe — we never see or store your credit card details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            You may request access to, correction of, or deletion of your personal data at any time.
            To exercise these rights, please contact us at the email below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">7. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            For privacy-related inquiries, contact us at{' '}
            <a href="mailto:contact@fh6tools.com" className="text-brand-400 hover:text-brand-300 underline">contact@fh6tools.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
