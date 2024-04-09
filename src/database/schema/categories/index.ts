import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { products } from '../products'
import { categoryProducts } from '../category-products'

export const categoryStatusEnum = pgEnum('category_status', [
  'active',
  'inactive',
])

export const categories = pgTable('categories', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  status: categoryStatusEnum('active').default('active').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const categoriesRelations = relations(categories, ({ many }) => {
  return {
    products: many(products),
    categoryProducts: many(categoryProducts),
  }
})
