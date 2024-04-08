export type Category = {
  id: string
  name: string
  status: 'active' | 'inactive'
  created_at: Date | null
  updated_at: Date | null
}
