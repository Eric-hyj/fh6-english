// FH6 Japan Map Data — sourced from official reveals, preview builds, and community guides

export type POIType = 'landmark' | 'barn_find' | 'treasure_car' | 'fast_travel_board' | 'bonus_board' | 'regional_mascot' | 'car_meet' | 'circuit' | 'touge' | 'showcase' | 'estate'

export interface MapPOI {
  id: string
  name: string
  type: POIType
  region: string
  lat: number
  lng: number
  description: string
  reward?: string
}

export interface MapRegion {
  id: string
  name: string
  nameJa: string
  bounds: [[number, number], [number, number]] // [[south, west], [north, east]]
  description: string
  color: string
}

// ====================================================================
// 10 Regions — South to North
// ====================================================================
export const REGIONS: MapRegion[] = [
  {
    id: 'minamino',
    name: 'Minamino',
    nameJa: '南野',
    bounds: [[35.05, 138.55], [35.55, 139.35]],
    description: 'Southern gateway — coastal roads, Izu Peninsula, Hakone Turnpike, Mt. Fuji foothills. Best region for early exploration and D/C-class championships.',
    color: '#22c55e',
  },
  {
    id: 'coastal',
    name: 'Izu & Hakone Coast',
    nameJa: '伊豆・箱根',
    bounds: [[34.75, 138.65], [35.15, 139.15]],
    description: 'Long coastal sightlines, Nachi Mountain, and ocean-view highways. Prime mascot farming territory.',
    color: '#06b6d4',
  },
  {
    id: 'itto',
    name: 'Itto',
    nameJa: '一等',
    bounds: [[35.45, 138.35], [36.05, 139.15]],
    description: 'Central heartland — Mt. Haruna passes, Bandai-Azuma Skyline, countryside touge roads. Built for drift events and B/A-class championships.',
    color: '#f59e0b',
  },
  {
    id: 'tokyo_downtown',
    name: 'Tokyo Downtown (C1)',
    nameJa: '東京ダウンタウン',
    bounds: [[35.62, 139.62], [35.73, 139.82]],
    description: 'Shibuya/Shinjuku-style neon grids. The C1 Inner Loop expressway. JDM street racing heartland — small, nimble builds dominate.',
    color: '#e62429',
  },
  {
    id: 'tokyo_dockyards',
    name: 'Tokyo Dockyards',
    nameJa: '東京ドックヤード',
    bounds: [[35.55, 139.68], [35.65, 139.82]],
    description: 'Tokyo Bay waterfront with wide straights and bridge connectors. Rainbow Bridge analogue. Best suits higher-speed builds.',
    color: '#3b82f6',
  },
  {
    id: 'tokyo_industrial',
    name: 'Industrial District (Daikoku)',
    nameJa: '大黒工業地帯',
    bounds: [[35.42, 139.62], [35.58, 139.75]],
    description: 'Modeled on the real Daikoku Parking Area — stacked interchanges, Wangan expressway, highest concentration of Touge stamps.',
    color: '#a855f7',
  },
  {
    id: 'tokyo_suburbs',
    name: 'Tokyo Suburbs',
    nameJa: '東京郊外',
    bounds: [[35.55, 139.38], [35.68, 139.65]],
    description: 'Quiet residential zones connecting Tokyo to Minamino. Predictable layouts — ideal for learning car behavior.',
    color: '#78716c',
  },
  {
    id: 'hokubu',
    name: 'Hokubu',
    nameJa: '北部',
    bounds: [[36.05, 138.35], [36.65, 139.05]],
    description: 'Northern circuit region — Hokubu Circuit, Bohashi Bridge, Sada Pass, Alpine approaches. Perfect for S1/S2 events.',
    color: '#ef4444',
  },
  {
    id: 'alps',
    name: 'Japanese Alps',
    nameJa: '日本アルプス',
    bounds: [[36.05, 137.55], [36.75, 138.50]],
    description: 'Highest elevation zone — permanent snow, Tateyama Kurobe Snow Corridor, ski resort. Endgame exploration territory.',
    color: '#f1f5f9',
  },
  {
    id: 'legends',
    name: 'Legend Island',
    nameJa: 'レジェンド島',
    bounds: [[35.95, 139.25], [36.25, 139.60]],
    description: 'Offshore island — exclusive events, own Festival Outpost, starting point for The Colossus (longest Goliath ever). Gold Wristband required.',
    color: '#fbbf24',
  },
]

// ====================================================================
// 40+ Points of Interest
// ====================================================================
export const POINTS_OF_INTEREST: MapPOI[] = [
  // ── Landmarks (15) ──
  {
    id: 'lm-shibuya',
    name: 'Shibuya Crossing',
    type: 'landmark',
    region: 'Tokyo Downtown (C1)',
    lat: 35.6595, lng: 139.7004,
    description: 'The iconic Tokyo scramble crossing. Photo-worthy landmark counting toward Journal stamps.',
    reward: 'Collection Journal Stamp',
  },
  {
    id: 'lm-tokyo-tower',
    name: 'Tokyo Tower',
    type: 'landmark',
    region: 'Tokyo Downtown (C1)',
    lat: 35.6586, lng: 139.7454,
    description: 'Visible from most of the city. One of 10 landmarks for the "Pin It!" achievement.',
    reward: '10G Achievement',
  },
  {
    id: 'lm-c1-loop',
    name: 'C1 Inner Loop Ring Road',
    type: 'landmark',
    region: 'Tokyo Downtown (C1)',
    lat: 35.6750, lng: 139.7600,
    description: '14.8 km elevated expressway ring around downtown Tokyo. The urban racing circuit.',
    reward: 'Collection Journal Stamp',
  },
  {
    id: 'lm-ginkgo',
    name: 'Ginkgo Avenue',
    type: 'landmark',
    region: 'Minamino',
    lat: 35.4200, lng: 138.9800,
    description: '300-meter tree-lined boulevard with 140+ ginkgo trees. Stunning in autumn season.',
    reward: 'Collection Journal Stamp',
  },
  {
    id: 'lm-fuji',
    name: 'Mt. Fuji',
    type: 'landmark',
    region: 'Japanese Alps',
    lat: 36.3500, lng: 138.0500,
    description: 'Japan\'s most famous landmark. Visible from much of the southern and central map.',
    reward: 'Collection Journal Stamp',
  },
  {
    id: 'lm-nachi',
    name: 'Nachi Mountain',
    type: 'landmark',
    region: 'Izu & Hakone Coast',
    lat: 34.9500, lng: 138.8500,
    description: 'Pilgrimage route with waterfall. Coastal photo target in the southern zone.',
    reward: 'Collection Journal Stamp',
  },
  {
    id: 'lm-rainbow',
    name: 'Rainbow Bridge',
    type: 'landmark',
    region: 'Tokyo Dockyards',
    lat: 35.6100, lng: 139.7800,
    description: 'Tokyo Bay suspension bridge connecting Downtown to the Dockyards and Daikoku areas.',
    reward: 'Collection Journal Stamp',
  },
  {
    id: 'lm-daikoku',
    name: 'Daikoku Parking Area',
    type: 'landmark',
    region: 'Industrial District (Daikoku)',
    lat: 35.4800, lng: 139.6800,
    description: 'Legendary real-world JDM meet spot recreated in-game. Interactive car meet hub — no loading screens.',
    reward: 'Social Hub',
  },
  {
    id: 'lm-kawazu',
    name: 'Kawazu-Nanadaru Loop Bridge',
    type: 'landmark',
    region: 'Minamino',
    lat: 35.1800, lng: 138.9200,
    description: 'Famous double-spiral viaduct in southern Izu. One of the most unique road structures on the map.',
    reward: 'Collection Journal Stamp',
  },
  {
    id: 'lm-snow-corridor',
    name: 'Tateyama Kurobe Snow Corridor',
    type: 'landmark',
    region: 'Japanese Alps',
    lat: 36.5500, lng: 137.9000,
    description: 'Drivable snow-walled road in the high Alps. Seasonal — most dramatic in spring after heavy snow.',
    reward: 'Collection Journal Stamp',
  },
  {
    id: 'lm-bullet-train',
    name: 'Shinkansen Line',
    type: 'landmark',
    region: 'Itto',
    lat: 35.8500, lng: 138.9500,
    description: 'Bullet train corridor looping the map perimeter. Train-vs-car showdown moments return from FH5.',
    reward: 'Photo Opportunity',
  },
  {
    id: 'lm-ski-resort',
    name: 'Sotoyama Ski Resort',
    type: 'landmark',
    region: 'Japanese Alps',
    lat: 36.6000, lng: 138.1500,
    description: 'Alpine ski resort hosting Horizon Rush obstacle courses. One of three Rush event locations.',
    reward: 'Horizon Rush Event',
  },
  {
    id: 'lm-space-center',
    name: 'Irokawa Space Center',
    type: 'landmark',
    region: 'Hokubu',
    lat: 36.3500, lng: 138.7500,
    description: 'Launch facility with danger sign and Horizon Rush events. Home to the "To The Moon" achievement jump.',
    reward: '10G Achievement',
  },
  {
    id: 'lm-estate',
    name: 'The Estate',
    type: 'landmark',
    region: 'Itto',
    lat: 35.7000, lng: 138.4500,
    description: 'Your personal plot of Japan — place garages, design racetracks, invite friends. Functions as a free tuning garage.',
    reward: 'Player Housing',
  },
  {
    id: 'lm-legends-island',
    name: 'Legend Island',
    type: 'landmark',
    region: 'Legend Island',
    lat: 36.1000, lng: 139.4500,
    description: 'Endgame zone. Own Festival Outpost, exclusive events, starting point of The Colossus (longest Goliath ever).',
    reward: 'Gold Wristband Required',
  },

  // ── Mountain Passes / Touge (7) ──
  {
    id: 'touge-haruna',
    name: 'Mt. Haruna (Akina)',
    type: 'touge',
    region: 'Itto',
    lat: 35.8500, lng: 138.6500,
    description: 'Real-life inspiration for Initial D\'s Mt. Akina. Iconic hairpins and elevation changes — the ultimate precision driving test.',
  },
  {
    id: 'touge-bandai',
    name: 'Bandai-Azuma Skyline',
    type: 'touge',
    region: 'Itto',
    lat: 35.9500, lng: 139.0000,
    description: '28.7 km high-elevation touge route in Fukushima-inspired terrain.',
  },
  {
    id: 'touge-izu',
    name: 'Izu Skyline',
    type: 'touge',
    region: 'Izu & Hakone Coast',
    lat: 34.9500, lng: 138.9500,
    description: 'Grip-focused coastal ribbon road with stunning ocean views.',
  },
  {
    id: 'touge-hakone',
    name: 'Hakone Turnpike',
    type: 'touge',
    region: 'Minamino',
    lat: 35.2500, lng: 139.0000,
    description: 'Ocean-view mountain pass south of Tokyo. Popular touge racing destination.',
  },
  {
    id: 'touge-sada',
    name: 'Sada Pass',
    type: 'touge',
    region: 'Hokubu',
    lat: 36.3500, lng: 138.5000,
    description: 'Northern route network pass connecting to the Alps approaches.',
  },
  {
    id: 'touge-irohazaka',
    name: 'Irohazaka Winding Road',
    type: 'touge',
    region: 'Itto',
    lat: 35.7500, lng: 138.5500,
    description: 'Technical downhill touge with hairpin sequences. Treasure Car hotspot nearby.',
  },
  {
    id: 'touge-wangan',
    name: 'Bayshore/Wangan Route',
    type: 'touge',
    region: 'Industrial District (Daikoku)',
    lat: 35.5000, lng: 139.7200,
    description: 'High-speed Tokyo Bay expressway. Top-speed highway pulls — the Wangan racing experience.',
  },

  // ── Circuits (3) ──
  {
    id: 'circuit-hokubu',
    name: 'Hokubu Circuit',
    type: 'circuit',
    region: 'Hokubu',
    lat: 36.4000, lng: 138.8000,
    description: 'Northern region\'s dedicated racing circuit. High-speed corners suited for S1/S2 class events.',
  },
  {
    id: 'circuit-c1',
    name: 'C1 Inner Loop Circuit',
    type: 'circuit',
    region: 'Tokyo Downtown (C1)',
    lat: 35.6800, lng: 139.7550,
    description: '14.8 km urban expressway ring. Dense traffic, tight walls — the ultimate street circuit test.',
  },
  {
    id: 'circuit-colossus',
    name: 'The Colossus (Start)',
    type: 'circuit',
    region: 'Legend Island',
    lat: 36.1200, lng: 139.4200,
    description: 'Longest Goliath event in series history. Loops the entire map on the perimeter expressway.',
  },

  // ── Showcase Events (3) ──
  {
    id: 'showcase-mech',
    name: 'Chaser Zero Showcase',
    type: 'showcase',
    region: 'Industrial District (Daikoku)',
    lat: 35.5200, lng: 139.7000,
    description: 'Race against a full-scale mech. One of the Festival\'s most spectacular showcase events.',
    reward: '20G Achievement',
  },
  {
    id: 'showcase-flight',
    name: 'Flight Club Showcase',
    type: 'showcase',
    region: 'Hokubu',
    lat: 36.4500, lng: 138.7000,
    description: 'Aerial showcase event — race against aircraft across varied terrain.',
    reward: '20G Achievement',
  },
  {
    id: 'rush-docks',
    name: 'Horizon Rush: Tokyo Docks',
    type: 'showcase',
    region: 'Tokyo Dockyards',
    lat: 35.5900, lng: 139.7600,
    description: 'Timed obstacle course at the docks. Earn stars based on completion speed.',
    reward: '10G Achievement',
  },

  // ── Barn Finds (known locations) (5) ──
  {
    id: 'bf-minamino-1',
    name: 'Barn Find: Classic JDM',
    type: 'barn_find',
    region: 'Minamino',
    lat: 35.3000, lng: 138.7500,
    description: 'Early-game Barn Find. Rumored to contain a classic Japanese sports car. Unlocked via Collection Journal Yellow Stamp tier.',
    reward: 'Free Classic Car',
  },
  {
    id: 'bf-itto-1',
    name: 'Barn Find: Rally Legend',
    type: 'barn_find',
    region: 'Itto',
    lat: 35.8000, lng: 138.6000,
    description: 'Hidden in the mountain forests of Itto. Requires Green Stamp tier in the Collection Journal.',
    reward: 'Free Rally Car',
  },
  {
    id: 'bf-alps-1',
    name: 'Barn Find: Alpine Secret',
    type: 'barn_find',
    region: 'Japanese Alps',
    lat: 36.4500, lng: 138.1000,
    description: 'High-altitude barn in the Japanese Alps. Unlocked at Pink Stamp tier or higher.',
    reward: 'Free Rare Car',
  },
  {
    id: 'bf-hokubu-1',
    name: 'Barn Find: Northern Classic',
    type: 'barn_find',
    region: 'Hokubu',
    lat: 36.2500, lng: 138.6000,
    description: 'Remote northern barn near Sada Pass. Higher-tier Collection Journal stamp required.',
    reward: 'Free Vintage Car',
  },
  {
    id: 'bf-coastal-1',
    name: 'Barn Find: Coastal Relic',
    type: 'barn_find',
    region: 'Izu & Hakone Coast',
    lat: 34.9000, lng: 138.8000,
    description: 'Seaside barn hidden off the coastal highway. Mid-game stamp tier required.',
    reward: 'Free Classic Car',
  },

  // ── Treasure Cars (known) (6) ──
  {
    id: 'tc-figaro',
    name: 'Treasure Car: 1991 Nissan Figaro',
    type: 'treasure_car',
    region: 'Minamino',
    lat: 35.3500, lng: 138.9000,
    description: 'Photo clues from Mei point to this retro Nissan. Buy at a below-market price once discovered.',
    reward: '1991 Nissan Figaro (Discounted)',
  },
  {
    id: 'tc-safari',
    name: 'Treasure Car: 1985 Nissan Safari Turbo',
    type: 'treasure_car',
    region: 'Itto',
    lat: 35.7200, lng: 138.7000,
    description: 'Off-road legend hidden in the Itto highlands. One of nine Treasure Cars.',
    reward: '1985 Nissan Safari Turbo (Discounted)',
  },
  {
    id: 'tc-charger',
    name: 'Treasure Car: 1969 Dodge Charger R/T',
    type: 'treasure_car',
    region: 'Hokubu',
    lat: 36.3000, lng: 138.5500,
    description: 'American muscle tucked away in northern Japan. Pre-modified with tuning and bodywork.',
    reward: '1969 Dodge Charger R/T (Discounted)',
  },
  {
    id: 'tc-okuibuki',
    name: 'Treasure Car: Okuibuki Secret',
    type: 'treasure_car',
    region: 'Itto',
    lat: 35.6500, lng: 138.3500,
    description: 'Confirmed hidden car near Okuibuki on the western edge of Itto. Worth a dedicated 90-minute hunt session.',
    reward: 'Pre-tuned A-Class Car (Discounted)',
  },
  {
    id: 'tc-alps-rare',
    name: 'Treasure Car: Alpine Special',
    type: 'treasure_car',
    region: 'Japanese Alps',
    lat: 36.4000, lng: 138.0000,
    description: 'One of the harder Treasure Cars to reach. Requires off-road capability to access the high Alpine location.',
    reward: 'Pre-tuned S1-Class Car (Discounted)',
  },
  {
    id: 'tc-tokyo',
    name: 'Treasure Car: Tokyo Underground',
    type: 'treasure_car',
    region: 'Tokyo Dockyards',
    lat: 35.5800, lng: 139.7500,
    description: 'Hidden among the dockyard container stacks. Photo clues lead to this urban treasure.',
    reward: 'Pre-tuned Street Car (Discounted)',
  },

  // ── Car Meets (4) ──
  {
    id: 'meet-daikoku',
    name: 'Daikoku PA Car Meet',
    type: 'car_meet',
    region: 'Industrial District (Daikoku)',
    lat: 35.4850, lng: 139.6850,
    description: 'The legendary JDM gathering spot. Roll up, show your build, challenge others to tandem runs — no loading screens.',
  },
  {
    id: 'meet-shibuya',
    name: 'Shibuya Underground Meet',
    type: 'car_meet',
    region: 'Tokyo Downtown (C1)',
    lat: 35.6620, lng: 139.7000,
    description: 'Urban car meet in the heart of Tokyo. Popular spot for street racers and JDM enthusiasts.',
  },
  {
    id: 'meet-hakone',
    name: 'Hakone Viewpoint Meet',
    type: 'car_meet',
    region: 'Minamino',
    lat: 35.2200, lng: 139.0200,
    description: 'Scenic mountain viewpoint car meet overlooking the ocean. Popular cruise destination.',
  },
  {
    id: 'meet-alps',
    name: 'Alps Ski Lodge Meet',
    type: 'car_meet',
    region: 'Japanese Alps',
    lat: 36.5800, lng: 138.1200,
    description: 'High-altitude car meet near the ski resort. Unique snowy backdrop for photos.',
  },
]

// ====================================================================
// Collectible Groups (for tracking)
// ====================================================================
export const COLLECTIBLE_GROUPS = {
  regional_mascots: { total: 200, reward: '5,000 CR each (1,000,000 CR total)', achievement: 'Gotta Smash \'em All (30G)', regions: ['All regions, roadside'] },
  bonus_boards: { total: 200, reward: 'XP', achievement: 'A Few Splinters Is Nothing! (30G)', regions: ['Tokyo urban zone (highest density)'] },
  fast_travel_boards: { total: 50, reward: '-2% fast travel cost each (free at 50)', regions: ['Tokyo, urban centers, mountain passes'] },
  treasure_cars: { total: 9, reward: 'Discounted pre-tuned cars', achievement: 'Treasure Hunter (30G)', regions: ['Itto, Hokubu, Alps — off-road areas'] },
  landmarks: { total: 10, reward: 'Collection Journal Stamps', achievement: 'Pin It! (10G)', regions: ['Scattered across all regions'] },
  barn_finds: { total: 'TBC', reward: 'Free rare cars', regions: ['Gated behind Collection Journal stamp tiers'] },
}

// ====================================================================
// POI type config
// ====================================================================
export const POI_TYPE_CONFIG: Record<POIType, { label: string; color: string; icon: string }> = {
  landmark: { label: 'Landmark', color: '#f59e0b', icon: '📸' },
  barn_find: { label: 'Barn Find', color: '#e62429', icon: '🔧' },
  treasure_car: { label: 'Treasure Car', color: '#22c55e', icon: '💎' },
  fast_travel_board: { label: 'Fast Travel Board', color: '#3b82f6', icon: '⚡' },
  bonus_board: { label: 'Bonus Board', color: '#a855f7', icon: '⭐' },
  regional_mascot: { label: 'Regional Mascot', color: '#ec4899', icon: '🎯' },
  car_meet: { label: 'Car Meet', color: '#06b6d4', icon: '🏁' },
  circuit: { label: 'Circuit', color: '#ef4444', icon: '🏎️' },
  touge: { label: 'Touge Pass', color: '#f97316', icon: '🏔️' },
  showcase: { label: 'Showcase Event', color: '#8b5cf6', icon: '🎪' },
  estate: { label: 'Estate', color: '#78716c', icon: '🏠' },
}
