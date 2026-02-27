import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Helper to check if env vars are set and not placeholders
const isConfigured = supabaseUrl &&
  supabaseUrl !== 'your-project-url-here' &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your-anon-key-here'

export const supabase = isConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : (() => {
    console.warn('Supabase is not configured. Creating a mock client.')
    // Return a proxy that logs warnings when methods are called
    return new Proxy({}, {
      get: (target, prop) => {
        if (prop === 'auth') {
          return {
            getUser: async () => ({ data: { user: null }, error: null }),
            getSession: async () => ({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithOAuth: async () => { console.log('Mock signInWithOAuth called'); return { error: null } },
            signOut: async () => { console.log('Mock signOut called'); return { error: null } },
          }
        }
        if (typeof prop === 'string' && ['from', 'rpc', 'storage'].includes(prop)) {
          return () => ({
            select: () => ({
              eq: () => ({
                single: async () => ({ data: null, error: null }),
                maybeSingle: async () => ({ data: null, error: null }),
                order: () => ({ data: [], error: null }),
              }),
              order: () => ({ data: [], error: null }),
            }),
            insert: async () => ({ data: null, error: null }),
            update: async () => ({ data: null, error: null }),
            delete: async () => ({ data: null, error: null }),
            upload: async () => ({ data: null, error: null }),
            getPublicUrl: () => ({ data: { publicUrl: '' } }),
          })
        }
        return () => {
          console.warn(`Supabase client method '${String(prop)}' called but not configured.`)
          return { data: null, error: { message: 'Supabase not configured' } }
        }
      }
    }) as any
  })()

// --- TYPE DEFINITIONS FOR DATABASE ---

export type Profile = {
  id: string
  full_name: string
  role: 'customer' | 'vendor' | 'rider'
  avatar_url?: string
}

export type Restaurant = {
  id: string
  owner_id: string
  name: string
  image_url: string
  delivery_time_min: number
  rating: number
}

export type MenuItem = {
  id: string
  restaurant_id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
}

export type Order = {
  id: string
  customer_id: string
  restaurant_id: string
  rider_id?: string
  status: 'pending' | 'accepted' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'cancelled'
  total_amount: number
  created_at: string
}
