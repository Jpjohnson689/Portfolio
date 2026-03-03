'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LayoutDashboard, UserPlus, Users, ClipboardList, LogOut, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: UserPlus },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Jobs', href: '/admin/jobs', icon: ClipboardList },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="md:hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-forest px-4 py-3">
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-mint" />
          <span className="font-bold text-white text-sm">
            Trashcan<span className="text-mint">Wrangler</span>
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="bg-forest border-t border-white/10 px-4 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium',
                  isActive ? 'bg-sage/30 text-white' : 'text-mint/70'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-mint/70 w-full cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
