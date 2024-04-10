export type Product = {
  id: string
  name: string
  description?: string
  priceInCents: number
  images: string[]
  categoryId: string
  created_at: Date | null
  updated_at: Date | null
}
