'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { PHONE_HREF, SMS_HREF } from '@/lib/constants'

export function StickyMobileBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="flex shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <a
          href={PHONE_HREF}
          className="flex-1 flex items-center justify-center gap-2 bg-sage text-white py-4 font-semibold text-sm"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <a
          href={SMS_HREF}
          className="flex-1 flex items-center justify-center gap-2 bg-sand text-white py-4 font-semibold text-sm"
        >
          <MessageCircle className="h-4 w-4" />
          Text Us
        </a>
      </div>
    </div>
  )
}
