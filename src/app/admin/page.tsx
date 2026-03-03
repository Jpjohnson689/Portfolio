'use client'

import { useEffect, useState } from 'react'
import { UserPlus, Users, ClipboardList, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { StatsCard } from '@/components/admin/StatsCard'

interface Stats {
  newLeads: number
  activeCustomers: number
  todaysJobs: number
  completedToday: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    newLeads: 0,
    activeCustomers: 0,
    todaysJobs: 0,
    completedToday: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()
      const today = new Date().toISOString().split('T')[0]

      const [leadsRes, customersRes, jobsRes, completedRes] = await Promise.all([
        supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('customers').select('id', { count: 'exact', head: true }).eq('active', true),
        supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('service_date', today),
        supabase
          .from('jobs')
          .select('id', { count: 'exact', head: true })
          .eq('service_date', today)
          .eq('status', 'completed'),
      ])

      setStats({
        newLeads: leadsRes.count ?? 0,
        activeCustomers: customersRes.count ?? 0,
        todaysJobs: jobsRes.count ?? 0,
        completedToday: completedRes.count ?? 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Dashboard</h1>

      {loading ? (
        <div className="text-slate">Loading stats...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="New Leads" value={stats.newLeads} icon={UserPlus} />
          <StatsCard title="Active Customers" value={stats.activeCustomers} icon={Users} />
          <StatsCard title="Today's Jobs" value={stats.todaysJobs} icon={ClipboardList} />
          <StatsCard title="Completed Today" value={stats.completedToday} icon={CheckCircle2} />
        </div>
      )}
    </div>
  )
}
