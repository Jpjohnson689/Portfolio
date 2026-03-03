'use client'

import { Phone } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { LeadForm } from './LeadForm'
import { PHONE_NUMBER, PHONE_HREF } from '@/lib/constants'

export function CTASection() {
  return (
    <section id="lead-form" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">
                Ready to stop dragging bins?
              </h2>
              <p className="text-lg text-slate mb-2">
                Get your free quote in 60 seconds.
              </p>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-sage font-semibold hover:underline"
              >
                <Phone className="h-4 w-4" />
                Or call/text {PHONE_NUMBER}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <LeadForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
