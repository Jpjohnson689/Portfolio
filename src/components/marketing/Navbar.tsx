'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Service Areas', href: '#service-area' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Trash2 className="h-7 w-7 text-sage" />
            <span className="text-xl font-bold text-forest">
              Trashcan<span className="text-sage">Wrangler</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-sage transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a href={PHONE_HREF} className="flex items-center gap-1.5 text-sage font-medium">
              <Phone className="h-4 w-4" />
              {PHONE_NUMBER}
            </a>
            <Button
              variant="sand"
              size="sm"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-charcoal hover:text-sage font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 py-2 text-sage font-semibold"
            >
              <Phone className="h-4 w-4" />
              {PHONE_NUMBER}
            </a>
            <Button
              variant="sand"
              className="w-full"
              onClick={() => {
                setIsOpen(false)
                document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
