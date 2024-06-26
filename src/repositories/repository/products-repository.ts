import type { Product } from '../../dtos/products/Product'
import type { CreateProductInput } from '../../dtos/products/create-product-input'

export interface ListAllProductsReply {
  products: Product[]
  meta: {
    pageIndex: number
    perPage: number
    total: number
  }
}

export type GetAllProducts = ListAllProductsReply
export interface ProductsRepository {
  getAllProducts(
    productId: string | undefined,
    name: string | undefined,
    pageIndex: number,
  ): Promise<GetAllProducts>
  listAllProducts(
    categoryId: string | undefined,
    pageIndex: number,
  ): Promise<ListAllProductsReply>
  findProductById(productId: string): Promise<Product | null>
  findProductByName(productName: string): Promise<Product | null>
  createProduct(data: CreateProductInput): Promise<Product>
  updateProduct(data: Product): Promise<Product>
  deleteProduct(productId: string): Promise<void>
}
