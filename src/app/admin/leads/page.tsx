'use client'

import { useEffect, useState, useCallback } from 'react'
import { UserPlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { Lead, LeadStatus, DayOfWeek } from '@/lib/types'

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
]

const statusBadgeVariant: Record<LeadStatus, 'success' | 'info' | 'warning' | 'sand' | 'default'> = {
  new: 'success',
  contacted: 'info',
  quoted: 'warning',
  converted: 'sand',
  lost: 'default',
}

const dayOptions = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [convertingId, setConvertingId] = useState<string | null>(null)
  const [convertForm, setConvertForm] = useState({
    address: '',
    pickup_day: 'monday' as DayOfWeek,
  })

  const fetchLeads = useCallback(async () => {
    const supabase = createClient()
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') {
      query = query.eq('status', filter)
    }
    const { data } = await query
    setLeads(data ?? [])
    setLoading(false)
  }, [filter])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const updateStatus = async (id: string, status: LeadStatus) => {
    const supabase = createClient()
    await supabase.from('leads').update({ status }).eq('id', id)
    fetchLeads()
  }

  const convertToCustomer = async (lead: Lead) => {
    const supabase = createClient()
    const { data: customer } = await supabase
      .from('customers')
      .insert({
        first_name: lead.first_name,
        last_name: lead.last_name || '',
        email: lead.email,
        phone: lead.phone,
        address: convertForm.address || lead.address || '',
        zip: lead.zip || '',
        can_count: lead.can_count || 1,
        pickup_day: convertForm.pickup_day,
        plan: (lead.can_count || 1) > 1 ? 'multi' : 'single',
        converted_from_lead: lead.id,
      })
      .select()
      .single()

    if (customer) {
      await supabase.from('leads').update({ status: 'converted' as LeadStatus }).eq('id', lead.id)
    }

    setConvertingId(null)
    fetchLeads()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-charcoal">Leads</h1>
          <Badge variant="success">{leads.length}</Badge>
        </div>
      </div>

      <div className="mb-6">
        <Select
          options={statusOptions}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {loading ? (
        <div className="text-slate">Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-12 text-slate">
          <UserPlus className="h-12 w-12 mx-auto mb-4 text-slate/40" />
          <p>No leads yet. They&apos;ll appear here when someone fills out the form.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Zip</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Cans</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-charcoal">
                      {lead.first_name} {lead.last_name || ''}
                    </td>
                    <td className="px-4 py-3 text-charcoal">{lead.phone}</td>
                    <td className="px-4 py-3 text-charcoal">{lead.zip || '—'}</td>
                    <td className="px-4 py-3 text-charcoal">{lead.can_count}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusBadgeVariant[lead.status]}>{lead.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Select
                          options={statusOptions.filter((s) => s.value !== 'all')}
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                          className="text-xs py-1 px-2"
                        />
                        {lead.status !== 'converted' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setConvertingId(lead.id)}
                          >
                            Convert
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Convert to Customer Dialog */}
      {convertingId && (() => {
        const lead = leads.find((l) => l.id === convertingId)
        if (!lead) return null
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
              <h2 className="text-xl font-bold text-charcoal mb-4">Convert Lead to Customer</h2>
              <p className="text-slate mb-6">
                Converting <strong>{lead.first_name} {lead.last_name || ''}</strong> ({lead.phone})
              </p>
              <div className="space-y-4">
                <Input
                  id="convert-address"
                  label="Service Address"
                  placeholder="123 Main St"
                  value={convertForm.address || lead.address || ''}
                  onChange={(e) =>
                    setConvertForm((prev) => ({ ...prev, address: e.target.value }))
                  }
                />
                <Select
                  id="convert-day"
                  label="Pickup Day"
                  options={dayOptions}
                  value={convertForm.pickup_day}
                  onChange={(e) =>
                    setConvertForm((prev) => ({
                      ...prev,
                      pickup_day: e.target.value as DayOfWeek,
                    }))
                  }
                />
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setConvertingId(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => convertToCustomer(lead)}
                >
                  Convert
                </Button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
