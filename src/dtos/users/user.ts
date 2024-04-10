export type User = {
  id: string
  name: string
  email: string
  phone?: string | null
  role: 'admin' | 'customer'
  password_hash: string
  created_at: Date | null
  updated_at: Date | null
}
