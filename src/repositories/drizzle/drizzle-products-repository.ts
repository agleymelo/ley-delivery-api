import { and, count, eq, ilike } from 'drizzle-orm'

import { db } from '../../database/connection'
import { products } from '../../database/schema'
import type { CreateProductInput } from '../../dtos/products/create-product-input'
import type { Product } from '../../dtos/products/Product'
import type {
  ListAllProductsReply,
  ProductsRepository,
} from '../repository/products-repository'

export class DrizzleProductsRepository implements ProductsRepository {
  async listAllProducts(
    categoryId: string | undefined,
    pageIndex: number,
  ): Promise<ListAllProductsReply> {
    const [[{ count: amountOfProducts }], allProducts] = await Promise.all([
      db.select({ count: count() }).from(products),
      db
        .select()
        .from(products)
        .where(categoryId ? eq(products.categoryId, categoryId) : undefined)
        .limit(10)
        .offset(pageIndex * 10),
    ])

    return {
      products: allProducts as Product[],
      meta: {
        pageIndex,
        perPage: 10,
        total: amountOfProducts,
      },
    }
  }

  async getAllProducts(
    productId: string | undefined,
    name: string | undefined,
    pageIndex: number,
  ): Promise<ListAllProductsReply> {
    const [[{ count: amountOfProducts }], allProducts] = await Promise.all([
      db.select({ count: count() }).from(products),
      db
        .select()
        .from(products)
        .where(
          and(
            productId ? eq(products.id, productId) : undefined,
            name ? ilike(products.name, `%${name}%`) : undefined,
          ),
        )
        .limit(10)
        .offset(pageIndex * 10),
    ])

    return {
      products: allProducts as Product[],
      meta: {
        pageIndex,
        perPage: 10,
        total: amountOfProducts,
      },
    }
  }

  async findProductById(productId: string): Promise<Product | null> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))

    if (!product) {
      return null
    }

    return product as Product
  }

  async findProductByName(productName: string): Promise<Product | null> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.name, productName))

    if (!product) {
      return null
    }

    return product as Product
  }

  async createProduct({
    name,
    description,
    priceInCents,
    images,
    categoryId,
  }: CreateProductInput): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values({
        name,
        description,
        priceInCents,
        images,
        categoryId,
      })
      .returning()

    return product as Product
  }

  async updateProduct({
    id,
    name,
    description,
    priceInCents,
    images,
    categoryId,
  }: Product): Promise<Product> {
    const [product] = await db
      .update(products)
      .set({
        name,
        description,
        priceInCents,
        images,
        categoryId,
      })
      .where(eq(products.id, id))
      .returning()

    return product as Product
  }

  async deleteProduct(productId: string): Promise<void> {
    await db.delete(products).where(eq(products.id, productId))
  }
}
