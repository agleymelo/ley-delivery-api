import { createId } from '@paralleldrive/cuid2'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { orders } from '../orders'
import { products } from '../products'
import { categories } from '../categories'

export const categoryProducts = pgTable('category_products', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  categoryId: text('order_id')
    .notNull()
    .references(() => orders.id, {
      onDelete: 'set null',
    }),
  productId: text('product_id').references(() => products.id, {
    onDelete: 'set null',
  }),
})

export const categoryProductsRelations = relations(
  categoryProducts,
  ({ one }) => {
    return {
      category: one(categories, {
        fields: [categoryProducts.categoryId],
        references: [categories.id],
        relationName: 'category_product_product',
      }),
      product: one(products, {
        fields: [categoryProducts.productId],
        references: [products.id],
        relationName: 'product_category_product',
      }),
    }
  },
)
