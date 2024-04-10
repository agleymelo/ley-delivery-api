export type Order = {
  id: string
  customerId: string | null
  status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'cancelled'
  totalInCents: number
  created_at: Date | null
}
