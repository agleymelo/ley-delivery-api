import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { categories } from '../categories'
import { orderItems } from '../order-items'

export const products = pgTable('products', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  priceInCents: integer('price_in_cents'),
  image: text('images'),

  categoryId: text('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const productsRelations = relations(products, ({ one, many }) => {
  return {
    category: one(categories, {
      fields: [products.categoryId],
      references: [categories.id],
      relationName: 'order_customer',
    }),
    orderItems: many(orderItems),
  }
})
