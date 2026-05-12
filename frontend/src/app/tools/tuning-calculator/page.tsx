'use client'

import { useState } from 'react'
import { Calculator, Copy, Save, Share2, Info, Gauge, Zap, Shield, Thermometer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const VEHICLES = [
  { id: 'supra25', name: 'Toyota GR Supra 2025', class: 'A', pi: 720, type: 'Street' },
  { id: 'civic', name: 'Honda Civic Type R', class: 'B', pi: 650, type: 'Street' },
  { id: 'focus', name: 'Ford Focus RS', class: 'A', pi: 700, type: 'Rally' },
  { id: 'm2', name: 'BMW M2 Competition', class: 'S1', pi: 780, type: 'Street' },
  { id: 'gt3', name: 'Porsche 911 GT3 RS', class: 'S1', pi: 820, type: 'Track' },
  { id: 'viper', name: 'Dodge Viper ACR', class: 'S2', pi: 880, type: 'Track' },
  { id: 'wrangler', name: 'Jeep Wrangler Trailcat', class: 'A', pi: 710, type: 'Offroad' },
  { id: 'huracan', name: 'Lamborghini Huracán STO', class: 'S2', pi: 900, type: 'Track' },
]

const BUILD_TYPES = [
  { id: 'budget', label: 'Budget Build', desc: 'Under 100,000 credits' },
  { id: 'balanced', label: 'Balanced Build', desc: 'Best for most races' },
  { id: 'max', label: 'Max Performance', desc: 'No expense spared' },
]

type StatKey = 'speed' | 'handling' | 'accel' | 'braking' | 'launch'

interface Stats {
  speed: number
  handling: number
  accel: number
  braking: number
  launch: number
}

const BASE_STATS: Record<string, Stats> = {
  supra25: { speed: 6.5, handling: 7.0, accel: 6.8, braking: 6.5, launch: 6.0 },
  civic: { speed: 5.5, handling: 8.0, accel: 6.0, braking: 7.5, launch: 6.5 },
  focus: { speed: 6.0, handling: 7.0, accel: 6.5, braking: 6.5, launch: 7.0 },
  m2: { speed: 7.0, handling: 7.5, accel: 7.2, braking: 7.0, launch: 6.5 },
  gt3: { speed: 8.0, handling: 8.5, accel: 7.8, braking: 8.0, launch: 7.0 },
  viper: { speed: 9.0, handling: 7.0, accel: 8.5, braking: 7.5, launch: 7.5 },
  wrangler: { speed: 5.5, handling: 6.0, accel: 5.5, braking: 5.0, launch: 8.0 },
  huracan: { speed: 9.0, handling: 8.5, accel: 9.0, braking: 8.5, launch: 8.0 },
}

const BUILD_MULTIPLIERS: Record<string, Partial<Stats>> = {
  budget: { speed: 1.1, handling: 1.05, accel: 1.1, braking: 1.0, launch: 1.05 },
  balanced: { speed: 1.25, handling: 1.3, accel: 1.25, braking: 1.2, launch: 1.2 },
  max: { speed: 1.5, handling: 1.4, accel: 1.5, braking: 1.4, launch: 1.4 },
}

const TUNE_PARAMS: Record<string, Record<string, string>> = {
  budget: {
    'Tires': 'Sport (Default PSI)',
    'Suspension': 'Sport Springs',
    'Brakes': 'Sport Brakes',
    'Transmission': 'Sport Clutch',
    'Differential': 'Stock',
    'Engine': 'Sport Intake & Exhaust',
  },
  balanced: {
    'Tires': 'Race Slick (28 PSI)',
    'Suspension': 'Race Coilovers',
    'Brakes': 'Race Brakes',
    'Transmission': 'Race 6-Speed',
    'Differential': 'Race LSD',
    'Engine': 'Race Pistons & Camshaft',
  },
  max: {
    'Tires': 'Race Slick (26 PSI)',
    'Suspension': 'Pro Adjustable',
    'Brakes': 'Carbon Ceramic Pro',
    'Transmission': 'Pro Sequential',
    'Differential': 'Pro Race LSD',
    'Engine': 'Full Race Build + Turbo',
  },
}

function RadarChart({ stats, size = 180 }: { stats: Stats; size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38
  const labels: StatKey[] = ['speed', 'handling', 'accel', 'braking', 'launch']
  const labelNames = ['Speed', 'Handling', 'Accel', 'Braking', 'Launch']

  const points = labels.map((key, i) => {
    const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2
    const value = (stats[key] / 10) * r
    return { x: cx + value * Math.cos(angle), y: cy + value * Math.sin(angle), label: labelNames[i] }
  })

  const gridLevels = [0.25, 0.5, 0.75, 1.0]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {gridLevels.map((level) => {
        const pts = labels.map((_, i) => {
          const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2
          const v = level * r
          return `${cx + v * Math.cos(angle)},${cy + v * Math.sin(angle)}`
        }).join(' ')
        return <polygon key={level} points={pts} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      })}
      {labels.map((_, i) => {
        const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2
        const x2 = cx + r * Math.cos(angle)
        const y2 = cy + r * Math.sin(angle)
        return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      })}
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="rgba(230,36,41,0.15)"
        stroke="#e62429"
        strokeWidth={2}
      />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={3} fill="#e62429" />
          <text x={p.x} y={p.y - 10} textAnchor="middle" fill="#888" fontSize={9}>
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function TuningCalculatorPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[0])
  const [buildType, setBuildType] = useState('balanced')

  const baseStats = BASE_STATS[selectedVehicle.id]
  const multiplier = BUILD_MULTIPLIERS[buildType]

  const tunedStats: Stats = {
    speed: Math.min(baseStats.speed * (multiplier.speed || 1), 10),
    handling: Math.min(baseStats.handling * (multiplier.handling || 1), 10),
    accel: Math.min(baseStats.accel * (multiplier.accel || 1), 10),
    braking: Math.min(baseStats.braking * (multiplier.braking || 1), 10),
    launch: Math.min(baseStats.launch * (multiplier.launch || 1), 10),
  }

  const avgStat = (Object.values(tunedStats).reduce((a, b) => a + b, 0) / 5).toFixed(1)

  return (
    <div className="container-custom py-10">
      <div className="mb-8">
        <Badge variant="default" className="mb-3">Interactive Tool</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Vehicle Tuning Calculator</h1>
        <p className="text-muted-foreground max-w-xl">Select a vehicle and build type to get the perfect tuning setup. Compare performance before and after tuning.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Vehicle Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5 text-brand-400" />
                Select Vehicle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {VEHICLES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    className={cn(
                      'p-3 rounded-xl text-left text-sm border transition-all',
                      selectedVehicle.id === v.id
                        ? 'border-brand-600 bg-brand-600/10'
                        : 'border-border hover:border-muted bg-card'
                    )}
                  >
                    <div className="font-medium truncate">{v.name}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Badge variant="secondary" className="text-[10px]">{v.class}</Badge>
                      <span className="text-[10px] text-muted-foreground">PI {v.pi}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Build Type */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                Build Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-3">
                {BUILD_TYPES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBuildType(b.id)}
                    className={cn(
                      'p-4 rounded-xl text-left border transition-all',
                      buildType === b.id
                        ? 'border-brand-600 bg-brand-600/10'
                        : 'border-border hover:border-muted'
                    )}
                  >
                    <div className="font-semibold text-sm">{b.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{b.desc}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tuning Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-400" />
                Recommended Parts & Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(TUNE_PARAMS[buildType]).map(([part, setting]) => (
                  <div key={part} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm font-medium">{part}</span>
                    <span className="text-sm text-muted-foreground">{setting}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Copy className="h-3.5 w-3.5" /> Copy Setup
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Save className="h-3.5 w-3.5" /> Save
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Performance Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-brand-400">{avgStat}</span>
                <span className="text-muted-foreground"> / 10 Avg Rating</span>
              </div>

              <RadarChart stats={tunedStats} />

              <div className="space-y-3 mt-6">
                {([['speed', 'Speed', Gauge, '#e62429'],
                  ['handling', 'Handling', Shield, '#22c55e'],
                  ['accel', 'Acceleration', Zap, '#f59e0b'],
                  ['braking', 'Braking', Thermometer, '#3b82f6'],
                  ['launch', 'Launch', Info, '#a855f7'],
                ] as const).map(([key, label, Icon, color]) => (
                  <div key={key} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{label}</span>
                        <span className="font-medium">{(tunedStats[key as StatKey]).toFixed(1)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-accent overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${(tunedStats[key as StatKey] / 10) * 100}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span className="font-medium">{selectedVehicle.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Build</span>
                  <span className="font-medium">{BUILD_TYPES.find(b => b.id === buildType)?.label}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Class</span>
                  <span className="font-medium">{selectedVehicle.class} (PI {selectedVehicle.pi})</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
