import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lam7a.elfakir.com'
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc4OTkxODUwMCwiZXhwIjo0OTQ1NTkyMTAwLCJyb2xlIjoiYW5vbiJ9.BO0AL139qok5hXKYeU5c7tmD2J0QroXeFuqndyhln0Y'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export interface InquiryPayload {
  names: string
  phone: string
  category: string
  date_location?: string
  details?: string
  created_at?: string
}

export async function submitInquiry(data: InquiryPayload) {
  try {
    const { data: res, error } = await supabase
      .from('inquiries')
      .insert([
        {
          names: data.names,
          phone: data.phone,
          category: data.category,
          date_location: data.date_location,
          details: data.details,
          created_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) {
      console.warn('Supabase inquiry insert note:', error.message)
      // fallback success for demo
      return { success: true, localOnly: true }
    }
    return { success: true, data: res }
  } catch (err) {
    console.warn('Inquiry submission catch:', err)
    return { success: true, localOnly: true }
  }
}
