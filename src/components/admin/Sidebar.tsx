'use client'

import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, UserPlus, Users, ClipboardList, LogOut, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: UserPlus },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Jobs', href: '/admin/jobs', icon: ClipboardList },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-forest min-h-screen p-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <Trash2 className="h-6 w-6 text-mint" />
        <span className="text-lg font-bold text-white">
          Trashcan<span className="text-mint">Wrangler</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sage/30 text-white'
                  : 'text-mint/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </a>
          )
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-mint/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
      >
        <LogOut className="h-5 w-5" />
        Sign Out
      </button>
    </aside>
  )
}
