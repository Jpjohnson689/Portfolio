'use client'

import { AlertTriangle, Sun, Clock } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'HOA Fines',
    description:
      'Bins left at the curb past the deadline? That\'s a citation waiting to happen. We get them back before anyone notices.',
  },
  {
    icon: Sun,
    title: 'Texas Heat',
    description:
      '105\u00B0 and your bins are still at the curb. We handle the walk so you don\'t have to step outside.',
  },
  {
    icon: Clock,
    title: 'Busy Schedules',
    description:
      'Working late? Traveling? Kids\' activities? Returning bins falls to the bottom of the list. We take it off entirely.',
  },
]

export function WhyUs() {
  return (
    <section className="py-20 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Built for busy NW DFW homeowners"
            light
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {painPoints.map((point, i) => (
            <ScrollReveal key={point.title} delay={i * 0.15}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                <point.icon className="h-10 w-10 text-sand mb-5" />
                <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                <p className="text-mint leading-relaxed">{point.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
