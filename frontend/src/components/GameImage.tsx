'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface GameImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  wrapperClassName?: string
  priority?: boolean
}

const CAR_PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80',
]

function CarSVGPlaceholder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 500" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="50%" stopColor="#16213e" />
          <stop offset="100%" stopColor="#0f0f1a" />
        </linearGradient>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e62429" stopOpacity="0" />
          <stop offset="50%" stopColor="#e62429" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e62429" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#carGrad)" />
      <rect y="200" width="800" height="100" fill="url(#glow)" />

      {/* Speed lines */}
      {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x, i) => (
        <line key={i} x1={x} y1="150" x2={x - 60} y2="250" stroke="#e62429" strokeOpacity="0.15" strokeWidth="2" />
      ))}

      {/* Car silhouette */}
      <g transform="translate(150, 170)">
        <path d="M50 120 L80 80 L120 60 L200 50 L350 50 L420 60 L450 80 L480 120 L500 120 L500 160 L50 160 Z" fill="#2a2a3e" />
        <path d="M80 80 L120 60 L200 50 L350 50 L420 60 L450 80 L480 120 L400 120 L380 95 L350 85 L200 85 L170 95 L150 120Z" fill="#3a3a5e" />
        {/* Windows */}
        <path d="M160 75 L200 62 L330 62 L370 75 L370 115 L160 115Z" fill="#1a1a3e" />
        {/* Wheels */}
        <circle cx="160" cy="155" r="30" fill="#111" />
        <circle cx="160" cy="155" r="15" fill="#333" />
        <circle cx="380" cy="155" r="30" fill="#111" />
        <circle cx="380" cy="155" r="15" fill="#333" />
        {/* Headlight */}
        <rect x="480" y="100" width="20" height="15" rx="3" fill="#f5a623" fillOpacity="0.8" />
        {/* Taillight */}
        <rect x="45" y="100" width="15" height="12" rx="2" fill="#e62429" />
        {/* Racing stripe */}
        <rect x="100" y="85" width="380" height="8" fill="#e62429" fillOpacity="0.6" rx="4" />
        {/* Number */}
        <text x="250" y="135" fill="#e62429" fontSize="28" fontWeight="bold" opacity="0.3">FH6</text>
      </g>

      <text x="400" y="380" textAnchor="middle" fill="#888" fontSize="14">Forza Horizon 6</text>
    </svg>
  )
}

export function CarHeroBackground({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-10" />
      <CarSVGPlaceholder className="w-full h-full object-cover opacity-30" />
    </div>
  )
}

export function GuideCardImage({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [error, setError] = useState(false)
  const placeholderIndex = alt.length % CAR_PLACEHOLDERS.length
  const imgSrc = src || CAR_PLACEHOLDERS[placeholderIndex]

  if (error || !src) {
    return (
      <div className={cn('w-full h-40 bg-gradient-to-br from-brand-900/30 to-accent flex items-center justify-center overflow-hidden', className)}>
        <svg viewBox="0 0 100 60" className="h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="60" fill="#1a1a2e" />
          <path d="M10 45 L20 30 L30 25 L60 20 L80 23 L90 28 L90 45Z" fill="#2a2a3e" />
          <rect x="30" y="28" width="30" height="15" fill="#1a1a3e" />
          <circle cx="30" cy="45" r="8" fill="#111" />
          <circle cx="70" cy="45" r="8" fill="#111" />
        </svg>
      </div>
    )
  }

  return (
    <div className={cn('w-full h-40 relative overflow-hidden', className)}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
        sizes="(max-width: 768px) 100vw, 400px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  )
}

export function getCarImage(index: number = 0): string {
  return CAR_PLACEHOLDERS[index % CAR_PLACEHOLDERS.length]
}

export default CarSVGPlaceholder
