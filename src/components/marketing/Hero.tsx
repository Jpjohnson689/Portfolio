'use client'

import { motion } from 'framer-motion'
import { Check, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const pricingFeatures = [
  'Curb to garage or side yard',
  'Every scheduled pickup day',
  'Rain or shine, year-round',
  'No contracts — cancel anytime',
]

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column — Copy */}
          <div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-mint/30 text-forest text-sm font-medium mb-6">
                Serving NW DFW
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest leading-tight mb-6"
            >
              Never drag your trash cans in again
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate mb-8 max-w-lg"
            >
              We return your bins from the curb to your garage or side yard — every pickup day, rain or shine.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <Button
                variant="sand"
                size="lg"
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Free Quote
              </Button>
              <a href={PHONE_HREF}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Phone className="h-5 w-5 mr-2" />
                  Call or Text
                </Button>
              </a>
            </motion.div>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate text-sm"
            >
              Or call us directly:{' '}
              <a href={PHONE_HREF} className="text-sage font-semibold hover:underline">
                {PHONE_NUMBER}
              </a>
            </motion.p>
          </div>

          {/* Right column — Pricing card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 max-w-md mx-auto">
              <p className="text-slate text-sm font-medium mb-2">Starting at</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl md:text-6xl font-bold text-forest">$3.49</span>
              </div>
              <p className="text-slate mb-8">/can per week</p>

              <ul className="space-y-4 mb-8">
                {pricingFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-sage mt-0.5 shrink-0" />
                    <span className="text-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
