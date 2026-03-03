'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'

const plans = [
  {
    name: 'Single Can',
    price: '3.49',
    unit: '/week',
    description: 'One trash or recycling bin returned every pickup day.',
    features: [
      'Weekly bin return',
      'Same-day service',
      'Text confirmation',
      'No contracts',
    ],
    popular: false,
  },
  {
    name: 'Multi-Can',
    price: '2.99',
    unit: '/can per week',
    description: 'Save when we return 2 or more bins together.',
    features: [
      'Weekly bin return',
      'Same-day service',
      'Text confirmation',
      'Volume discount',
      'No contracts',
    ],
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Simple, transparent pricing"
            subtitle="No contracts. No hidden fees. Cancel anytime."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.15}>
              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  plan.popular
                    ? 'bg-forest text-white ring-2 ring-sand shadow-xl'
                    : 'bg-cream border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <Badge variant="sand" className="absolute -top-3 left-8 text-sm px-4 py-1">
                    Most Popular
                  </Badge>
                )}

                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-forest'}`}>
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-sand' : 'text-forest'}`}>
                    ${plan.price}
                  </span>
                  <span className={plan.popular ? 'text-mint' : 'text-slate'}>
                    {plan.unit}
                  </span>
                </div>

                <p className={`mb-6 ${plan.popular ? 'text-mint' : 'text-slate'}`}>
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className={`h-5 w-5 shrink-0 ${plan.popular ? 'text-mint' : 'text-sage'}`} />
                      <span className={plan.popular ? 'text-white' : 'text-charcoal'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'sand' : 'primary'}
                  size="lg"
                  className="w-full"
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
