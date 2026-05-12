export const SITE_CONFIG = {
  name: 'FH6 Guide',
  tagline: 'The Ultimate Forza Horizon 6 Resource',
  description: 'Comprehensive FH6 guides, tuning calculator, collectibles map, and expert tips. Master every race, find every Barn Find, and build the ultimate car collection.',
  url: 'https://fh6tools.com',
  author: 'FH6 Guide Team',
  social: {
    twitter: '@fh6guide',
    discord: 'https://discord.gg/fh6guide',
    reddit: 'https://reddit.com/r/fh6guide',
  },
} as const

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Guides', href: '/guides' },
  { label: 'Tuning Tool', href: '/tools/tuning-calculator' },
  { label: 'Map', href: '/tools/collectibles-map' },
  { label: 'Membership', href: '/membership/portal' },
] as const

export const GUIDE_CATEGORIES = [
  { id: 'beginner', label: 'Beginner Guides', icon: '🎮', count: 12 },
  { id: 'cars', label: 'Car Guides', icon: '🚗', count: 18 },
  { id: 'racing', label: 'Racing Tips', icon: '🏁', count: 10 },
  { id: 'collectibles', label: 'Collectibles', icon: '🗺️', count: 8 },
  { id: 'achievements', label: 'Achievements', icon: '🏆', count: 6 },
] as const

export const MEMBERSHIP_PLANS = {
  free: { name: 'Free', price: 0, features: ['Basic guides', 'Basic tools', 'Ads supported'] },
  monthly: { name: 'Premium Monthly', price: 4.99, features: ['Ad-free', 'All guides & tools', 'Exclusive tunes', 'PDF downloads'] },
  yearly: { name: 'Premium Yearly', price: 49.99, features: ['Everything in Monthly', '2 months free', 'Priority support'] },
  lifetime: { name: 'Lifetime', price: 99.99, features: ['All premium features', 'Lifetime updates', 'Custom tuning requests'] },
} as const

export const GAME_LAUNCH_DATE = new Date('2026-05-19T00:00:00Z')
