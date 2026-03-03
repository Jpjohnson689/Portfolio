'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface FormData {
  first_name: string
  phone: string
  address: string
  zip: string
  can_count: string
  message: string
}

interface FormErrors {
  first_name?: string
  phone?: string
}

export function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    phone: '',
    address: '',
    zip: '',
    can_count: '1',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.first_name.trim()) newErrors.first_name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^\(?[\d]{3}\)?[-.\s]?[\d]{3}[-.\s]?[\d]{4}$/.test(formData.phone.trim()))
      newErrors.phone = 'Enter a valid phone number'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          can_count: parseInt(formData.can_count),
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // Silently handle — the form will remain visible for retry
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="h-16 w-16 text-sage mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-forest mb-2">We got your info!</h3>
        <p className="text-slate">Expect a call or text within a few hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="first_name"
          label="Your Name"
          placeholder="First name"
          value={formData.first_name}
          onChange={(e) => updateField('first_name', e.target.value)}
          error={errors.first_name}
        />
        <Input
          id="phone"
          label="Phone Number"
          placeholder="(682) 555-0199"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          error={errors.phone}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="address"
          label="Street Address"
          placeholder="123 Main St"
          value={formData.address}
          onChange={(e) => updateField('address', e.target.value)}
        />
        <Input
          id="zip"
          label="Zip Code"
          placeholder="76244"
          value={formData.zip}
          onChange={(e) => updateField('zip', e.target.value)}
          maxLength={5}
        />
      </div>

      <Select
        id="can_count"
        label="Number of Cans"
        value={formData.can_count}
        onChange={(e) => updateField('can_count', e.target.value)}
        options={[
          { value: '1', label: '1 can — $3.49/week' },
          { value: '2', label: '2 cans — $2.99/can/week' },
          { value: '3', label: '3+ cans — $2.99/can/week' },
        ]}
      />

      <Textarea
        id="message"
        label="Anything else we should know?"
        placeholder="Gate code, bin location, special instructions..."
        value={formData.message}
        onChange={(e) => updateField('message', e.target.value)}
        rows={3}
      />

      <Button variant="sand" size="lg" className="w-full" type="submit" disabled={loading}>
        <Send className="h-5 w-5 mr-2" />
        {loading ? 'Sending...' : 'Get My Free Quote'}
      </Button>
    </form>
  )
}
