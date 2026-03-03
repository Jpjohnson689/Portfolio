'use client'

import { Star } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'

const testimonials = [
  {
    quote:
      "I can't believe I used to drag those bins in the Texas heat. TrashcanWrangler is the best $3.49 I spend every week.",
    name: 'Sarah M.',
    location: 'Keller',
    stars: 5,
  },
  {
    quote:
      'Our HOA is strict about bins at the curb. These guys have saved us from at least two citations already.',
    name: 'James R.',
    location: 'Trophy Club',
    stars: 5,
  },
  {
    quote:
      "Signed up for one can, upgraded to three within a week. Total game changer for our family.",
    name: 'Maria L.',
    location: 'Haslet',
    stars: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="What our neighbors say"
            subtitle="Real feedback from homeowners across NW DFW."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-sand text-sand" />
                  ))}
                </div>
                <p className="text-charcoal leading-relaxed mb-6 flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-forest">{t.name}</p>
                  <p className="text-sm text-slate">{t.location}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
