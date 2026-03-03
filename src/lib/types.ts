export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'converted' | 'lost'
export type JobStatus = 'scheduled' | 'in_progress' | 'completed' | 'skipped'
export type PlanType = 'single' | 'multi'
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

export interface Lead {
  id: string
  first_name: string
  last_name: string | null
  email: string | null
  phone: string
  address: string | null
  zip: string | null
  neighborhood: string | null
  can_count: number
  message: string | null
  source: string | null
  status: LeadStatus
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  first_name: string
  last_name: string
  email: string | null
  phone: string
  address: string
  city: string
  zip: string
  neighborhood: string | null
  can_count: number
  pickup_day: DayOfWeek
  plan: PlanType
  notes: string | null
  active: boolean
  converted_from_lead: string | null
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  customer_id: string
  service_date: string
  status: JobStatus
  can_count: number
  completion_photo: string | null
  notes: string | null
  completed_at: string | null
  created_at: string
  customer?: Customer
}

export interface PricingPlan {
  id: string
  name: string
  type: PlanType
  price_per_can: number
  description: string | null
  features: string[]
  popular: boolean
  active: boolean
  created_at: string
}

export interface ServiceArea {
  id: string
  name: string
  zip_codes: string[]
  active: boolean
  created_at: string
}
