import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FH6 Guide - The Ultimate Forza Horizon 6 Resource'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0b 0%, #1a1a2e 50%, #16213e 100%)',
          fontFamily: 'Arial Black, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 120, fontWeight: 900, color: '#e62429' }}>FH6</span>
          <span style={{ fontSize: 60, fontWeight: 700, color: '#ffffff' }}>GUIDE</span>
        </div>
        <p style={{ fontSize: 32, color: '#a1a1aa', marginTop: 16 }}>
          The Ultimate Forza Horizon 6 Resource
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 32 }}>
          {['Guides', 'Tuning', 'Map', 'Collectibles'].map((t) => (
            <span
              key={t}
              style={{
                fontSize: 24,
                color: '#f59e0b',
                border: '2px solid #f59e0b',
                borderRadius: 99,
                padding: '8px 24px',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
