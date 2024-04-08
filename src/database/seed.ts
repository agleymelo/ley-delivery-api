/* eslint-disable drizzle/enforce-delete-with-where */
import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { categories, users } from './schema'
import { db } from './connection'
import { hash } from 'bcrypt'

// Reset database

await db.delete(users)
await db.delete(categories)

console.log(chalk.yellow('Database reset'))

// Seed database

// create customer
await db.insert(users).values({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password_hash: await hash('123456', 8),
  phone: faker.phone.number(),
  role: 'customer',
})

// create admin
await db.insert(users).values({
  name: 'Admin',
  email: 'admin@ley.com',
  phone: '1234567890',
  password_hash: await hash('123456', 8),
  role: 'admin',
})

console.log(chalk.greenBright('Create customer and admin'))

await db
  .insert(categories)
  .values([
    { name: 'Coffee' },
    { name: 'Drinks' },
    { name: 'Food' },
    { name: 'Snacks' },
    { name: 'Others' },
  ])

console.log(chalk.greenBright('Categories seeds'))

console.log(chalk.greenBright('Database seeded successfuilly'))

process.exit()
