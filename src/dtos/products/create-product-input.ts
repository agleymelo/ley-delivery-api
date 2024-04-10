import type { Product } from './Product'

export type CreateProductInput = Pick<
  Product,
  'name' | 'description' | 'priceInCents' | 'images' | 'categoryId'
>
