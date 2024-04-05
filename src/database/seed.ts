/* eslint-disable drizzle/enforce-delete-with-where */
import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { users } from './schema'
import { db } from './connection'

// Reset database

await db.delete(users)

console.log(chalk.yellow('Database reset'))

// Seed database

// create customer
await db.insert(users).values({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password_hash: faker.internet.password(),
  phone: faker.phone.number(),
  role: 'customer',
})

// create admin
await db.insert(users).values({
  name: 'Admin',
  email: 'admin@ley.com',
  phone: '1234567890',
  password_hash: '123',
  role: 'admin',
})

console.log(chalk.greenBright('Create customer and admin'))

console.log(chalk.greenBright('Database seeded successfuilly'))

process.exit()
