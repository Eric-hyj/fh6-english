import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FH6 Vehicle Tuning Calculator — Pro Setups & Tuning Guide',
  description: 'Get the perfect tuning setup for any FH6 vehicle. Includes Road Racing, Drift, Offroad, and Drag builds with real Forza community meta tuning parameters.',
  alternates: { canonical: 'https://fh6-english.vercel.app/tools/tuning-calculator' },
  openGraph: {
    title: 'FH6 Vehicle Tuning Calculator — Pro Setups & Tuning Guide',
    description: 'Get the perfect tuning setup for any FH6 vehicle. Road Racing, Drift, Offroad, Drag builds with real Forza meta tuning parameters.',
  },
}

export default function TuningCalcLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
