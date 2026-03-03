'use client'

import { useEffect, useState, useCallback } from 'react'
import { Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Customer } from '@/lib/types'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCustomers = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
    setCustomers(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  const toggleActive = async (id: string, active: boolean) => {
    const supabase = createClient()
    await supabase.from('customers').update({ active: !active }).eq('id', id)
    fetchCustomers()
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Customers</h1>
        <Badge variant="success">{customers.length}</Badge>
      </div>

      {loading ? (
        <div className="text-slate">Loading customers...</div>
      ) : customers.length === 0 ? (
        <div className="text-center py-12 text-slate">
          <Users className="h-12 w-12 mx-auto mb-4 text-slate/40" />
          <p>No customers yet. Convert a lead to create your first customer.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Address</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Zip</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Cans</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Pickup Day</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Plan</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-slate">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-charcoal">
                      {customer.first_name} {customer.last_name}
                    </td>
                    <td className="px-4 py-3 text-charcoal">{customer.phone}</td>
                    <td className="px-4 py-3 text-charcoal max-w-[200px] truncate">
                      {customer.address}
                    </td>
                    <td className="px-4 py-3 text-charcoal">{customer.zip}</td>
                    <td className="px-4 py-3 text-charcoal">{customer.can_count}</td>
                    <td className="px-4 py-3 text-charcoal capitalize">{customer.pickup_day}</td>
                    <td className="px-4 py-3">
                      <Badge variant={customer.plan === 'multi' ? 'sand' : 'default'}>
                        {customer.plan}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={customer.active ? 'success' : 'default'}>
                        {customer.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(customer.id, customer.active)}
                      >
                        {customer.active ? 'Deactivate' : 'Activate'}
                      </Button>
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
