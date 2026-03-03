import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  icon: LucideIcon
}

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-slate">{title}</p>
        <div className="p-2 bg-sage/10 rounded-lg">
          <Icon className="h-5 w-5 text-sage" />
        </div>
      </div>
      <p className="text-3xl font-bold text-charcoal">{value}</p>
    </div>
  )
}
