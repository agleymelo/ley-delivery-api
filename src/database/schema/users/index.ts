import { text, timestamp, pgTable, pgEnum } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { orders } from '../orders'

export const userRoleEnum = pgEnum('user_role', ['admin', 'customer'])

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  phone: text('phone'),
  role: userRoleEnum('role').default('customer').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => {
  return {
    orders: many(orders),
  }
})
