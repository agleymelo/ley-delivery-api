export type Product = {
  id: string
  name: string
  description?: string
  priceInCents: number
  image: string
  categoryId: string
  created_at: Date | null
  updated_at: Date | null
}
