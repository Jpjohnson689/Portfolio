'use client'

import { ClipboardList, Truck, Armchair } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'

const steps = [
  {
    number: '1',
    title: 'Sign Up',
    description: 'Tell us your address and pickup day. Takes 60 seconds.',
    icon: ClipboardList,
  },
  {
    number: '2',
    title: 'We Handle It',
    description: 'On your collection day, we return your bins to your garage or side yard.',
    icon: Truck,
  },
  {
    number: '3',
    title: 'Relax',
    description: 'No more dragging cans in the Texas heat. Ever.',
    icon: Armchair,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="How it works"
            subtitle="Three steps to never touching your trash cans again."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.15}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage text-white mb-6">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="text-sm font-bold text-sand mb-2">STEP {step.number}</div>
                <h3 className="text-xl font-bold text-forest mb-3">{step.title}</h3>
                <p className="text-slate leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
