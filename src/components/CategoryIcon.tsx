import { Flame, Droplets, ThermometerSun, Snowflake, Sparkles, RefreshCw } from 'lucide-react'

const iconMap: Record<string, typeof Flame> = {
  'mobile-sauna-rental': Flame,
  'cold-plunge-rental': Droplets,
  'contrast-therapy': RefreshCw,
  'infrared-sauna': ThermometerSun,
  'ice-bath-rental': Snowflake,
  'wellness-event-packages': Sparkles,
}

export default function CategoryIcon({ slug, className = 'w-6 h-6' }: { slug: string; className?: string }) {
  const Icon = iconMap[slug] || Flame
  return <Icon className={className} />
}
