import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: 'abattieucher@gmail.com',
    password: 'Admin123',
  })

  if (error) {
    console.error('Error signing up:', error.message)
  } else {
    console.log('User created successfully:', data.user.email)
    console.log('NOTE: You may need to confirm your email if email confirmation is enabled in Supabase.')
  }
}

signUp()
