/* eslint-disable camelcase */
/* eslint-disable drizzle/enforce-delete-with-where */
import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { hash } from 'bcrypt'

import { categories, orderItems, orders, products, users } from './schema'
import { db } from './connection'
import { createId } from '@paralleldrive/cuid2'

// Reset database

await db.delete(users)
await db.delete(categories)
await db.delete(orderItems)
await db.delete(orders)
await db.delete(products)

console.log(chalk.yellow('Database reset'))

// Seed database

// create customer
const [customer_one] = await db
  .insert(users)
  .values({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password_hash: await hash('123456', 8),
    phone: faker.phone.number(),
    role: 'customer',
  })
  .returning()

const [customer_two] = await db
  .insert(users)
  .values({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password_hash: await hash('123456', 8),
    phone: faker.phone.number(),
    role: 'customer',
  })
  .returning()

// create admin
await db
  .insert(users)
  .values({
    name: 'Admin',
    email: 'admin@ley.com',
    phone: '1234567890',
    password_hash: await hash('123456', 8),
    role: 'admin',
  })
  .returning()

console.log(chalk.greenBright('Create customer and admin'))

const createdCategories = await db
  .insert(categories)
  .values([
    { name: 'Coffee' },
    { name: 'Drinks' },
    { name: 'Food' },
    { name: 'Snacks' },
    { name: 'Others' },
  ])
  .returning()

console.log(chalk.greenBright('Categories seeds'))

/**
 * Create products
 */

function generateProduct() {
  const productsList = []

  for (let i = 0; i < 100; i++) {
    productsList.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      priceInCents: faker.number.int({ min: 1000, max: 10000 }),
      images: [faker.image.url()],
      categoryId: faker.helpers.arrayElement(createdCategories).id,
    })
  }

  return productsList
}

const availableProducts = await db
  .insert(products)
  .values(generateProduct())
  .returning()

console.log(chalk.greenBright('Product seeds'))

/**
 * Create order
 */

type OrderItemToInsert = typeof orderItems.$inferInsert
type OrderInsert = typeof orders.$inferInsert

const orderItemsToInsert: OrderItemToInsert[] = []
const ordersToInsert: OrderInsert[] = []

for (let i = 0; i < 187; i++) {
  const orderId = createId()

  const orderProducts = faker.helpers.arrayElements(availableProducts, {
    min: 1,
    max: 4,
  })

  let totalInCents = 0

  orderProducts.forEach((orderProduct) => {
    const quantity = faker.number.int({ min: 1, max: 5 })

    totalInCents += orderProduct.priceInCents! * quantity

    orderItemsToInsert.push({
      orderId,
      priceInCents: orderProduct.priceInCents!,
      quantity,
      productId: orderProduct.id,
    })
  })

  ordersToInsert.push({
    id: orderId,
    customerId: faker.helpers.arrayElement([customer_one.id, customer_two.id]),
    totalInCents,
    status: faker.helpers.arrayElement([
      'pending',
      'processing',
      'delivering',
      'delivered',
      'cancelled',
    ]),
    created_at: faker.date.recent({ days: 40 }),
  })
}

await db.insert(orders).values(ordersToInsert)
await db.insert(orderItems).values(orderItemsToInsert)

console.log(chalk.greenBright('Orders seeds'))

console.log(chalk.greenBright('Database seeded successfully'))

process.exit()
