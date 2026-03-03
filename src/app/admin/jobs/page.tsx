'use client'

import { useEffect, useState, useCallback } from 'react'
import { ClipboardList, Upload, Camera } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import type { Job, JobStatus, Customer } from '@/lib/types'

type JobWithCustomer = Omit<Job, 'customer'> & {
  customer: Pick<Customer, 'first_name' | 'last_name' | 'address' | 'zip' | 'phone'>
}

const statusBadgeVariant: Record<JobStatus, 'default' | 'info' | 'success' | 'warning'> = {
  scheduled: 'default',
  in_progress: 'info',
  completed: 'success',
  skipped: 'warning',
}

const nextStatus: Partial<Record<JobStatus, JobStatus>> = {
  scheduled: 'in_progress',
  in_progress: 'completed',
}

const DAYS_OF_WEEK = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobWithCustomer[]>([])
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  const fetchJobs = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('jobs')
      .select('*, customer:customers(first_name, last_name, address, zip, phone)')
      .eq('service_date', date)
      .order('created_at', { ascending: true })

    const formatted = (data ?? []).map((j) => ({
      ...j,
      customer: Array.isArray(j.customer) ? j.customer[0] : j.customer,
    })) as JobWithCustomer[]

    setJobs(formatted)
    setLoading(false)
  }, [date])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const updateStatus = async (id: string, status: JobStatus) => {
    const supabase = createClient()
    const updates: Record<string, unknown> = { status }
    if (status === 'completed') updates.completed_at = new Date().toISOString()
    await supabase.from('jobs').update(updates).eq('id', id)
    fetchJobs()
  }

  const generateJobs = async () => {
    setGenerating(true)
    const supabase = createClient()
    const dayOfWeek = DAYS_OF_WEEK[new Date(date + 'T12:00:00').getDay()]

    const { data: customers } = await supabase
      .from('customers')
      .select('id, can_count')
      .eq('active', true)
      .eq('pickup_day', dayOfWeek)

    if (customers && customers.length > 0) {
      const { data: existingJobs } = await supabase
        .from('jobs')
        .select('customer_id')
        .eq('service_date', date)

      const existingCustomerIds = new Set((existingJobs ?? []).map((j) => j.customer_id))
      const newJobs = customers
        .filter((c) => !existingCustomerIds.has(c.id))
        .map((c) => ({
          customer_id: c.id,
          service_date: date,
          can_count: c.can_count,
          status: 'scheduled' as JobStatus,
        }))

      if (newJobs.length > 0) {
        await supabase.from('jobs').insert(newJobs)
      }
    }

    setGenerating(false)
    fetchJobs()
  }

  const uploadPhoto = async (jobId: string, file: File) => {
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const path = `job-photos/${jobId}/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('job-photos')
      .upload(path, file)

    if (!uploadError) {
      const { data: urlData } = supabase.storage.from('job-photos').getPublicUrl(path)
      await supabase.from('jobs').update({ completion_photo: urlData.publicUrl }).eq('id', jobId)
      fetchJobs()
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-charcoal">Jobs</h1>
          <Badge variant="success">{jobs.length}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-auto"
          />
          <Button variant="primary" onClick={generateJobs} disabled={generating}>
            {generating ? 'Generating...' : 'Generate Jobs'}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-slate">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 text-slate">
          <ClipboardList className="h-12 w-12 mx-auto mb-4 text-slate/40" />
          <p>No jobs for this date. Click &quot;Generate Jobs&quot; to create today&apos;s schedule.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate">Customer</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Address</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Cans</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Photo</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-charcoal">
                      {job.customer?.first_name} {job.customer?.last_name}
                    </td>
                    <td className="px-4 py-3 text-charcoal">
                      {job.customer?.address}
                      {job.customer?.zip ? `, ${job.customer.zip}` : ''}
                    </td>
                    <td className="px-4 py-3 text-charcoal">{job.can_count}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusBadgeVariant[job.status]}>
                        {job.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {job.completion_photo ? (
                        <a
                          href={job.completion_photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sage hover:underline flex items-center gap-1"
                        >
                          <Camera className="h-4 w-4" />
                          View
                        </a>
                      ) : (
                        <label className="flex items-center gap-1 text-slate cursor-pointer hover:text-sage">
                          <Upload className="h-4 w-4" />
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) uploadPhoto(job.id, file)
                            }}
                          />
                        </label>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {nextStatus[job.status] && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => updateStatus(job.id, nextStatus[job.status]!)}
                        >
                          {nextStatus[job.status] === 'in_progress' ? 'Start' : 'Complete'}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
