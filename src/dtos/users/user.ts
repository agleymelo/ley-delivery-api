export type User = {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'customer'
  password_hash: string
  created_at: Date
  updated_at: Date
}
