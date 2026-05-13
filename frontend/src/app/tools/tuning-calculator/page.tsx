'use client'

import { useState, useMemo } from 'react'
import { Calculator, Copy, Save, Share2, Info, Gauge, Zap, Shield, Thermometer, Wrench, Cog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 真实FH5车辆数据，侧重日系车 (FH6 Japan)
const VEHICLES = [
  // D Class
  { id: 'datsun510', name: '1970 Datsun 510', class: 'D', pi: 350, type: 'Street', drivetrain: 'RWD', weight: 2100 },
  { id: 'mini65', name: '1965 Mini Cooper S', class: 'D', pi: 380, type: 'Street', drivetrain: 'FWD', weight: 1500 },
  { id: 'mx5-94', name: '1994 Mazda MX-5 Miata', class: 'D', pi: 390, type: 'Street', drivetrain: 'RWD', weight: 2200 },
  // C Class
  { id: 'celica92', name: '1992 Toyota Celica GT-Four', class: 'C', pi: 480, type: 'Rally', drivetrain: 'AWD', weight: 3100 },
  { id: 'rx7-97', name: '1997 Mazda RX-7 FD', class: 'C', pi: 490, type: 'Street', drivetrain: 'RWD', weight: 2800 },
  { id: 'silvia-s15', name: '1999 Nissan Silvia S15', class: 'C', pi: 470, type: 'Drift', drivetrain: 'RWD', weight: 2700 },
  // B Class
  { id: 'civic74', name: '1974 Honda Civic RS', class: 'B', pi: 550, type: 'Street', drivetrain: 'FWD', weight: 1500 },
  { id: 'nsxr92', name: '1992 Honda NSX-R', class: 'B', pi: 580, type: 'Street', drivetrain: 'RWD', weight: 2700 },
  { id: 'wrx05', name: '2005 Subaru Impreza WRX STI', class: 'B', pi: 560, type: 'Rally', drivetrain: 'AWD', weight: 3200 },
  { id: 'focus16', name: '2016 Ford Focus RS', class: 'B', pi: 570, type: 'Street', drivetrain: 'AWD', weight: 3400 },
  // A Class
  { id: 'civic18', name: '2018 Honda Civic Type R', class: 'A', pi: 680, type: 'Street', drivetrain: 'FWD', weight: 3100 },
  { id: 'eclipse95', name: '1995 Mitsubishi Eclipse GSX', class: 'A', pi: 650, type: 'Street', drivetrain: 'AWD', weight: 3200 },
  { id: 'm3e46', name: '2005 BMW M3 E46', class: 'A', pi: 670, type: 'Street', drivetrain: 'RWD', weight: 3400 },
  { id: 'supra20', name: '2020 Toyota GR Supra', class: 'A', pi: 690, type: 'Street', drivetrain: 'RWD', weight: 3400 },
  // S1 Class
  { id: '911gt3rs', name: '2019 Porsche 911 GT3 RS', class: 'S1', pi: 780, type: 'Track', drivetrain: 'RWD', weight: 3200 },
  { id: 'gtr20', name: '2020 Nissan GT-R Nismo', class: 'S1', pi: 760, type: 'Track', drivetrain: 'AWD', weight: 3800 },
  { id: 'senna18', name: '2018 McLaren Senna', class: 'S1', pi: 790, type: 'Track', drivetrain: 'RWD', weight: 2900 },
  // S2 Class
  { id: 'divo19', name: '2019 Bugatti Divo', class: 'S2', pi: 880, type: 'Track', drivetrain: 'AWD', weight: 4400 },
  { id: 'one1', name: '2014 Koenigsegg One:1', class: 'S2', pi: 890, type: 'Track', drivetrain: 'RWD', weight: 3000 },
  // R Class
  { id: 'rimac19', name: '2019 Rimac Nevera', class: 'R', pi: 950, type: 'Track', drivetrain: 'AWD', weight: 4800 },
  { id: 'jesko20', name: '2020 Koenigsegg Jesko', class: 'R', pi: 960, type: 'Track', drivetrain: 'RWD', weight: 3100 },
]

// 赛事类型及其调校参数
const DISCIPLINES = [
  { id: 'road', label: 'Road Racing', icon: '🏁', desc: 'Circuit & sprint races on asphalt' },
  { id: 'drift', label: 'Drift', icon: '💨', desc: 'Drift zones & drift races' },
  { id: 'offroad', label: 'Offroad', icon: '🏔️', desc: 'Dirt, cross-country & rally' },
  { id: 'drag', label: 'Drag Racing', icon: '⚡', desc: 'Quarter-mile drag strips' },
]

type StatKey = 'speed' | 'handling' | 'accel' | 'braking' | 'launch'

interface Stats {
  speed: number
  handling: number
  accel: number
  braking: number
  launch: number
}

// 车辆基础性能评分 (1-10)
const BASE_STATS: Record<string, Stats> = {
  datsun510:  { speed: 3.0, handling: 5.5, accel: 3.5, braking: 3.0, launch: 3.0 },
  mini65:     { speed: 2.5, handling: 6.0, accel: 3.0, braking: 3.0, launch: 3.5 },
  'mx5-94':   { speed: 3.5, handling: 7.0, accel: 4.0, braking: 3.5, launch: 3.5 },
  celica92:   { speed: 4.5, handling: 5.5, accel: 5.0, braking: 4.0, launch: 6.0 },
  'rx7-97':   { speed: 5.0, handling: 6.5, accel: 5.0, braking: 4.5, launch: 4.5 },
  'silvia-s15':{ speed: 4.5, handling: 6.0, accel: 5.0, braking: 4.0, launch: 4.5 },
  civic74:    { speed: 4.0, handling: 8.5, accel: 5.0, braking: 4.5, launch: 4.5 },
  nsxr92:     { speed: 5.5, handling: 8.0, accel: 6.0, braking: 5.5, launch: 5.0 },
  wrx05:      { speed: 5.0, handling: 6.5, accel: 6.0, braking: 5.0, launch: 7.0 },
  focus16:    { speed: 5.5, handling: 6.5, accel: 5.5, braking: 5.5, launch: 6.5 },
  civic18:    { speed: 6.0, handling: 8.0, accel: 6.5, braking: 6.0, launch: 6.0 },
  eclipse95:  { speed: 6.0, handling: 6.0, accel: 6.5, braking: 5.5, launch: 7.0 },
  m3e46:      { speed: 6.5, handling: 7.5, accel: 6.5, braking: 6.0, launch: 5.5 },
  supra20:    { speed: 7.0, handling: 7.0, accel: 7.0, braking: 6.5, launch: 6.0 },
  '911gt3rs': { speed: 8.0, handling: 8.5, accel: 7.5, braking: 8.0, launch: 7.0 },
  gtr20:      { speed: 7.5, handling: 7.0, accel: 8.0, braking: 7.5, launch: 8.5 },
  senna18:    { speed: 8.5, handling: 9.5, accel: 8.5, braking: 9.0, launch: 7.5 },
  divo19:     { speed: 9.5, handling: 7.5, accel: 9.0, braking: 8.0, launch: 8.5 },
  one1:       { speed: 9.5, handling: 8.0, accel: 9.5, braking: 8.5, launch: 8.0 },
  rimac19:    { speed: 10.0, handling: 7.0, accel: 10.0, braking: 7.5, launch: 10.0 },
  jesko20:    { speed: 10.0, handling: 7.5, accel: 9.5, braking: 8.0, launch: 8.5 },
}

// 赛事类型对性能的影响系数
const DISCIPLINE_MULTIPLIERS: Record<string, Partial<Stats>> = {
  road:    { speed: 1.30, handling: 1.35, accel: 1.20, braking: 1.30, launch: 1.10 },
  drift:   { speed: 0.80, handling: 1.15, accel: 1.15, braking: 0.80, launch: 1.25 },
  offroad: { speed: 0.85, handling: 1.05, accel: 1.20, braking: 0.90, launch: 1.40 },
  drag:    { speed: 1.45, handling: 0.60, accel: 1.50, braking: 0.50, launch: 1.55 },
}

// 真实调校参数 (来源: QuickTune H5 + Forza论坛)
interface TuneParams {
  'Tire Compound': string
  'Tire Pressure (F/R)': string
  'Camber (F/R)': string
  'Toe (F/R)': string
  'Caster': string
  'Anti-Roll Bars (F/R)': string
  'Springs (F/R)': string
  'Ride Height': string
  'Rebound (F/R)': string
  'Bump (F/R)': string
  'Differential (Accel/Decel)': string
  'Brake Balance': string
  'Aero (F/R)': string
}

const TUNE_PARAMS: Record<string, TuneParams> = {
  road: {
    'Tire Compound': 'Race Slicks',
    'Tire Pressure (F/R)': '32.5 / 32.5 PSI',
    'Camber (F/R)': '-2.5° / -1.5°',
    'Toe (F/R)': '0° / 0°',
    'Caster': '6.5°',
    'Anti-Roll Bars (F/R)': '20 / 18',
    'Springs (F/R)': '650 / 600 lb/in',
    'Ride Height': 'Lowest + 2 clicks',
    'Rebound (F/R)': '10.0 / 9.0',
    'Bump (F/R)': '5.5 / 4.5',
    'Differential (Accel/Decel)': '75% / 20%',
    'Brake Balance': '52% Front',
    'Aero (F/R)': 'Max Cornering / 75%',
  },
  drift: {
    'Tire Compound': 'Drift Tires',
    'Tire Pressure (F/R)': '32.0 / 35.0 PSI',
    'Camber (F/R)': '-5.0° / -2.0°',
    'Toe (F/R)': '+0.2° / 0°',
    'Caster': '7.0° (Max)',
    'Anti-Roll Bars (F/R)': '15 / 25',
    'Springs (F/R)': '500 / 550 lb/in',
    'Ride Height': 'Lowest + 3 clicks',
    'Rebound (F/R)': '9.0 / 10.0',
    'Bump (F/R)': '4.5 / 5.0',
    'Differential (Accel/Decel)': '95% / 30%',
    'Brake Balance': '60% Front',
    'Aero (F/R)': 'Min / Min',
  },
  offroad: {
    'Tire Compound': 'Offroad Race',
    'Tire Pressure (F/R)': '26.0 / 26.0 PSI',
    'Camber (F/R)': '-1.5° / -0.5°',
    'Toe (F/R)': '0° / +0.1°',
    'Caster': '5.5°',
    'Anti-Roll Bars (F/R)': '12 / 10',
    'Springs (F/R)': '450 / 400 lb/in',
    'Ride Height': 'Max - 3 clicks',
    'Rebound (F/R)': '8.0 / 7.0',
    'Bump (F/R)': '6.0 / 5.0',
    'Differential (Accel/Decel)': '85% / 40%',
    'Brake Balance': '55% Front',
    'Aero (F/R)': 'Min / Min',
  },
  drag: {
    'Tire Compound': 'Drag Slicks',
    'Tire Pressure (F/R)': '20.5 / 20.5 PSI',
    'Camber (F/R)': '-0.5° / -0.5°',
    'Toe (F/R)': '0° / 0°',
    'Caster': '5.0° (Min)',
    'Anti-Roll Bars (F/R)': '25 / 15',
    'Springs (F/R)': '400 / 350 lb/in',
    'Ride Height': 'Lowest',
    'Rebound (F/R)': '12.0 / 11.0',
    'Bump (F/R)': '3.0 / 3.0',
    'Differential (Accel/Decel)': '95% / 15%',
    'Brake Balance': '70% Front',
    'Aero (F/R)': 'Min / Max',
  },
}

// 引擎移植推荐
const ENGINE_SWAPS: Record<string, { engine: string; cost: string; hp: string; notes: string }> = {
  datsun510:  { engine: 'RB26DETT (R34 GT-R)', cost: '85,000 CR', hp: '520 HP', notes: '经典Skyline引擎移植，D→A级跃升' },
  'mx5-94':   { engine: 'LS3 V8 (Corvette)', cost: '95,000 CR', hp: '580 HP', notes: 'V8暴力移植，漂移神器' },
  'rx7-97':   { engine: '4-Rotor Racing', cost: '120,000 CR', hp: '650 HP', notes: '四转子赛车引擎，S1级猛兽' },
  'silvia-s15':{ engine: 'VR38DETT (GT-R)', cost: '110,000 CR', hp: '620 HP', notes: 'GT-R心脏，漂移王者' },
  civic74:    { engine: 'K20C1 (Civic Type R)', cost: '65,000 CR', hp: '350 HP', notes: '轻量化+K20，弯道杀手' },
  nsxr92:     { engine: 'C30A Twin Turbo', cost: '90,000 CR', hp: '580 HP', notes: '双涡轮NSX，S1级超跑杀手' },
  supra20:    { engine: '2JZ-GTE Built', cost: '105,000 CR', hp: '850 HP', notes: '千匹2JZ，S2级直线怪兽' },
  gtr20:      { engine: 'VR38 Built (Alpha 12)', cost: '150,000 CR', hp: '1,100 HP', notes: 'Alpha 12套件，R级性能' },
  '911gt3rs': { engine: '4.0L Flat-6 Race', cost: '135,000 CR', hp: '720 HP', notes: 'GT3 Cup赛车引擎' },
  m3e46:      { engine: 'S85 V10 (M5 E60)', cost: '100,000 CR', hp: '600 HP', notes: 'V10移植，赛道怪兽' },
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
  const [discipline, setDiscipline] = useState('road')

  const baseStats = BASE_STATS[selectedVehicle.id]
  const multiplier = DISCIPLINE_MULTIPLIERS[discipline]
  const tuneParams = TUNE_PARAMS[discipline]
  const engineSwap = ENGINE_SWAPS[selectedVehicle.id]

  const tunedStats: Stats = {
    speed: Math.min(baseStats.speed * (multiplier.speed || 1), 10),
    handling: Math.min(baseStats.handling * (multiplier.handling || 1), 10),
    accel: Math.min(baseStats.accel * (multiplier.accel || 1), 10),
    braking: Math.min(baseStats.braking * (multiplier.braking || 1), 10),
    launch: Math.min(baseStats.launch * (multiplier.launch || 1), 10),
  }

  const avgStat = (Object.values(tunedStats).reduce((a, b) => a + b, 0) / 5).toFixed(1)

  // 分组车辆
  const vehiclesByClass = useMemo(() => {
    const groups: Record<string, typeof VEHICLES> = {}
    VEHICLES.forEach((v) => {
      if (!groups[v.class]) groups[v.class] = []
      groups[v.class].push(v)
    })
    return groups
  }, [])

  const classOrder = ['D', 'C', 'B', 'A', 'S1', 'S2', 'R']

  return (
    <div className="container-custom py-10">
      <div className="mb-8">
        <Badge variant="default" className="mb-3">Interactive Tool</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Vehicle Tuning Calculator</h1>
        <p className="text-muted-foreground max-w-2xl">
          Select a vehicle and racing discipline to get the perfect tuning setup.
          All tuning values based on real Forza Horizon 5 community meta (QuickTune H5 + Forza Forums).
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-8">
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
            <CardContent className="space-y-4">
              {classOrder.map((cls) => {
                const cars = vehiclesByClass[cls]
                if (!cars) return null
                return (
                  <div key={cls}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-[10px] font-bold">{cls} Class</Badge>
                      <span className="text-[10px] text-muted-foreground">PI {cls === 'D' ? '100-399' : cls === 'C' ? '400-499' : cls === 'B' ? '500-599' : cls === 'A' ? '600-699' : cls === 'S1' ? '700-799' : cls === 'S2' ? '800-899' : '900-999'}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {cars.map((v) => (
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
                          <div className="font-medium truncate text-xs">{v.name}</div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Badge variant="secondary" className="text-[10px]">{v.class}</Badge>
                            <span className="text-[10px] text-muted-foreground">PI {v.pi}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            {v.drivetrain} · {v.weight.toLocaleString()} lbs
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Discipline Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                Racing Discipline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DISCIPLINES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDiscipline(d.id)}
                    className={cn(
                      'p-4 rounded-xl text-left border transition-all',
                      discipline === d.id
                        ? 'border-brand-600 bg-brand-600/10'
                        : 'border-border hover:border-muted'
                    )}
                  >
                    <div className="text-2xl mb-1">{d.icon}</div>
                    <div className="font-semibold text-sm">{d.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{d.desc}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tuning Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-400" />
                Recommended Tuning Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {Object.entries(tuneParams).map(([part, setting]) => (
                  <div key={part} className="flex items-center justify-between py-2 px-2 border-b border-border/50 last:border-0 hover:bg-accent/20 rounded transition-colors">
                    <span className="text-sm font-medium">{part}</span>
                    <span className="text-sm text-muted-foreground text-right ml-4">{setting}</span>
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

          {/* Engine Swap */}
          {engineSwap && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cog className="h-5 w-5 text-purple-400" />
                  Engine Swap Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Engine</span>
                    <span className="text-sm font-semibold">{engineSwap.engine}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cost</span>
                    <span className="text-sm font-mono text-amber-400">{engineSwap.cost}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Output</span>
                    <span className="text-sm font-mono text-green-400">{engineSwap.hp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">{engineSwap.notes}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Gauge className="h-5 w-5 text-brand-400" />
                Performance Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-brand-400">{avgStat}</span>
                <span className="text-muted-foreground"> / 10 Avg Rating</span>
                <div className="text-xs text-muted-foreground mt-1">
                  {DISCIPLINES.find(d => d.id === discipline)?.label} tuned
                </div>
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

              <div className="mt-6 pt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span className="font-medium">{selectedVehicle.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discipline</span>
                  <span className="font-medium">{DISCIPLINES.find(d => d.id === discipline)?.label}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Class</span>
                  <span className="font-medium">{selectedVehicle.class} (PI {selectedVehicle.pi})</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Drivetrain</span>
                  <span className="font-medium">{selectedVehicle.drivetrain}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">{selectedVehicle.weight.toLocaleString()} lbs</span>
                </div>
              </div>

              {/* Tuning Tips */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Pro Tip:</strong>{' '}
                  {discipline === 'road' && 'Target 32-34 PSI warm tire pressure via telemetry. Prioritize handling over raw power in A/S1 class.'}
                  {discipline === 'drift' && 'Use AWD conversion for high-score meta. Lock 1st gear only for drift zones. Formula Drift cars are best out-of-box.'}
                  {discipline === 'offroad' && 'Raise ride height for clearance. Softer springs absorb bumps better. AWD is mandatory for competitive offroad.'}
                  {discipline === 'drag' && 'Launch control at 4,500-5,500 RPM. AWD beats RWD off the line. Use Drag Slicks + max rear aero for stability.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
