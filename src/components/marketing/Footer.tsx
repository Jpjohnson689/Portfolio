import { Trash2, Phone, MapPin, Clock } from 'lucide-react'
import { PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'

const quickLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Service Areas', href: '#service-area' },
  { label: 'Get a Quote', href: '#lead-form' },
]

export function Footer() {
  return (
    <footer className="bg-forest text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trash2 className="h-6 w-6 text-mint" />
              <span className="text-xl font-bold">
                Trashcan<span className="text-mint">Wrangler</span>
              </span>
            </div>
            <p className="text-mint/80 leading-relaxed">
              Curb-to-door bin return for NW DFW homeowners. Never drag your trash cans in again.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-mint/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2 text-mint/80 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2 text-mint/80">
                <MapPin className="h-4 w-4 shrink-0" />
                Serving Haslet, Keller, Trophy Club, Roanoke &amp; more
              </li>
              <li className="flex items-center gap-2 text-mint/80">
                <Clock className="h-4 w-4" />
                Mon–Fri, same-day service
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-mint/60 text-sm">
          &copy; {new Date().getFullYear()} TrashcanWrangler. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
