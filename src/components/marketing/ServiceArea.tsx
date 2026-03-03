'use client'

import { useState } from 'react'
import { MapPin, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { SERVICE_ZIPS, COMMUNITIES } from '@/lib/constants'

export function ServiceArea() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<'found' | 'not-found' | null>(null)

  const checkZip = () => {
    if (!zip.trim()) return
    const found = SERVICE_ZIPS.includes(zip.trim())
    setResult(found ? 'found' : 'not-found')
    if (found) {
      setTimeout(() => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
      }, 1500)
    }
  }

  return (
    <section id="service-area" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Serving Northwest DFW"
            subtitle="We're your neighbors — locally owned and operated."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          {/* Communities list */}
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-sage" />
                Communities We Serve
              </h3>
              <div className="flex flex-wrap gap-2">
                {COMMUNITIES.map((community) => (
                  <Badge key={community} variant="success" className="text-sm px-3 py-1.5">
                    {community}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Zip checker */}
          <ScrollReveal direction="right">
            <div className="bg-cream rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-forest mb-4">
                Check your zip code
              </h3>
              <div className="flex gap-3">
                <Input
                  placeholder="e.g. 76244"
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value)
                    setResult(null)
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && checkZip()}
                  className="flex-1"
                  maxLength={5}
                />
                <Button variant="primary" onClick={checkZip}>
                  Check
                </Button>
              </div>

              {result === 'found' && (
                <div className="mt-4 flex items-center gap-2 text-sage font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  We serve your area! Scroll down to get started.
                </div>
              )}

              {result === 'not-found' && (
                <div className="mt-4 flex items-start gap-2 text-sand-dark">
                  <XCircle className="h-5 w-5 mt-0.5 shrink-0" />
                  <span>
                    We don&apos;t serve that area yet. Leave your info below and we&apos;ll let you know when we expand.
                  </span>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
