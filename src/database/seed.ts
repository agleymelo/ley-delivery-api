/* eslint-disable camelcase */
/* eslint-disable drizzle/enforce-delete-with-where */
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'
import chalk from 'chalk'

import { db } from './connection'
import { categories, orderItems, orders, products, users } from './schema'

// Reset database

await db.delete(users)
await db.delete(categories)
await db.delete(orderItems)
await db.delete(orders)
await db.delete(products)

console.log(chalk.yellow('Database reset'))

// Seed database

// create customer
await db
  .insert(users)
  .values({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password_hash: await hash('123456', 8),
    phone: faker.phone.number(),
    role: 'customer',
  })
  .returning()

await db
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
  .values([{ name: 'Coffee' }, { name: 'Desserts' }, { name: 'Candy' }])
  .returning()

console.log(chalk.greenBright('Categories seeds'))

/**
 * Create products
 */

await db.insert(products).values([
  {
    name: 'Café Arábica',
    description:
      'Este é o tipo de café mais comum e amplamente consumido globalmente. Possui um sabor suave e levemente adocicado, com notas de frutas e chocolate em algumas variedades.',
    priceInCents: 1490,
    image: '58f7eb951e3d40db1732-Arabica-coffee-cup.jpg',
    categoryId: createdCategories[0].id,
  },
  {
    name: 'Café Robusta',
    description:
      'Mais amargo e com mais cafeína que o Arábica, o café Robusta é popular em muitas partes do mundo devido ao seu sabor mais forte e à sua capacidade de manter o sabor em bebidas mistas, como cafés com leite.',
    priceInCents: 1990,
    image: 'd4f79a9df83f03877166-Robusta-Coffee-cup.jpg',
    categoryId: createdCategories[0].id,
  },
  {
    name: 'Café Expresso',
    description:
      'Este não é um tipo de café, mas um método de preparação. O espresso é feito forçando água quente sob pressão através de grãos de café finamente moídos. É encorpado, rico e concentrado, e serve de base para muitas outras bebidas de café.',
    priceInCents: 1490,
    image: '9497bd35eb88809e53b2-Espresso-coffee-cup.jpg',
    categoryId: createdCategories[0].id,
  },
  {
    name: 'Café Latte',
    description:
      'Uma bebida popular em muitos países, o café latte consiste em espresso e leite vaporizado, geralmente com uma pequena quantidade de espuma de leite no topo. É cremoso e suave.',
    priceInCents: 1000,
    image: '2d503566c2ab303e8ed1-coffee-latte-cup.jpg',
    categoryId: createdCategories[0].id,
  },
  {
    name: 'Café Cappuccino',
    description:
      'Feito com partes iguais de espresso, leite vaporizado e espuma de leite, o cappuccino é uma bebida clássica, conhecida por sua cremosidade e sabor equilibrado.',
    priceInCents: 1350,
    image: 'ac50f371ab532b628194-Cappuccino-coffee-cup.jpg',
    categoryId: createdCategories[0].id,
  },
])

await db.insert(products).values([
  {
    name: 'Tiramisù',
    description:
      'Uma sobremesa italiana clássica composta por camadas de biscoitos de champanhe embebidos em café, creme de queijo mascarpone e cacau em pó.',
    priceInCents: 900,
    image: '0f16455d4f076042b9fe-disserts-Tiramisu.jpg',
    categoryId: createdCategories[1].id,
  },
  {
    name: 'Brownie de Café',
    description:
      'Um brownie denso e rico, feito com chocolate e café, muitas vezes servido com nozes ou pedaços de chocolate adicionais.',
    priceInCents: 700,
    image: '1e309c66332cb50f57e1-disserts-Brownie-de-Cafe.jpg',
    categoryId: createdCategories[1].id,
  },
  {
    name: 'Cheesecake de Café',
    description:
      'Um cheesecake cremoso com sabor de café, geralmente acompanhado de uma crosta de biscoito ou base de brownie e cobertura de creme ou calda de café.',
    priceInCents: 1490,
    image: '3384be5719c29642e934-disserts-Affogato.jpg',
    categoryId: createdCategories[1].id,
  },
  {
    name: 'Affogato',
    description:
      'Uma sobremesa italiana simples e deliciosa que consiste em uma bola de sorvete de baunilha "afogada" em um shot de espresso quente.',
    priceInCents: 1000,
    image: '5597273d586dc9478368-disserts-Mousse-de-Cafe.jpg',
    categoryId: createdCategories[1].id,
  },
  {
    name: 'Mousse de Café',
    description:
      'Uma sobremesa leve e aerada, feita com café forte, chocolate e creme de leite, muitas vezes servida em copos individuais e decorada com raspas de chocolate ou grãos de café.',
    priceInCents: 2149,
    image: 'fc82cb2a9819cde56435-disserts-Cheesecake-de-Cafe.jpg',
    categoryId: createdCategories[1].id,
  },
])

await db.insert(products).values([
  {
    name: 'Trufa de Café',
    description:
      'Uma trufa de chocolate recheada com um ganache de café intenso, muitas vezes coberta com cacau em pó ou lascas de chocolate.',
    priceInCents: 450,
    image: '774c9d21656458daf952-candy-Trufa-de-Cafe.jpg',
    categoryId: createdCategories[2].id,
  },
  {
    name: 'Biscoito Amanteigado de Café',
    description:
      'Um biscoito amanteigado delicado e crocante, com um sabor sutil de café, perfeito para acompanhar uma xícara de café ou chá.',
    priceInCents: 900,
    image: '2de21bfd48540793274b-candy-Biscoito-Amanteigado-de-Cafe.jpg',
    categoryId: createdCategories[2].id,
  },
  {
    name: 'Chocolate Quente com Sabor de Café',
    description:
      'Um cheesecake cremoso com sabor de café, geralmente acompanhado de uma crosta de biscoito ou base de brownie e cobertura de creme ou calda de café.',
    priceInCents: 760,
    image: '15470ae8cf9635628a46-candy-Chocolate-Quente-com-Sabor-de-Cafe.jpg',
    categoryId: createdCategories[2].id,
  },
  {
    name: 'Palha Italiana de Café',
    description:
      'Uma sobremesa leve e aerada, feita com café forte, chocolate e creme de leite, muitas vezes servida em copos individuais e decorada com raspas de chocolate ou grãos de café.',
    priceInCents: 690,
    image: '9bafdd828b84fce5f2a3-candy-Palha-Italiana-de-Cafe.jpg',
    categoryId: createdCategories[2].id,
  },
])

console.log(chalk.greenBright('Product seeds'))

/**
 * Create order
 */

// type OrderItemToInsert = typeof orderItems.$inferInsert
// type OrderInsert = typeof orders.$inferInsert

// const orderItemsToInsert: OrderItemToInsert[] = []
// const ordersToInsert: OrderInsert[] = []

// for (let i = 0; i < 187; i++) {
//   const orderId = createId()

//   const orderProducts = faker.helpers.arrayElements(availableProducts, {
//     min: 1,
//     max: 4,
//   })

//   let totalInCents = 0

//   orderProducts.forEach((orderProduct) => {
//     const quantity = faker.number.int({ min: 1, max: 5 })

//     totalInCents += orderProduct.priceInCents! * quantity

//     orderItemsToInsert.push({
//       orderId,
//       priceInCents: orderProduct.priceInCents!,
//       quantity,
//       productId: orderProduct.id,
//     })
//   })

//   ordersToInsert.push({
//     id: orderId,
//     customerId: faker.helpers.arrayElement([customer_one.id, customer_two.id]),
//     totalInCents,
//     status: faker.helpers.arrayElement([
//       'pending',
//       'processing',
//       'delivering',
//       'delivered',
//       'cancelled',
//     ]),
//     created_at: faker.date.recent({ days: 40 }),
//   })
// }

// await db.insert(orders).values(ordersToInsert)
// await db.insert(orderItems).values(orderItemsToInsert)

// console.log(chalk.greenBright('Orders seeds'))

console.log(chalk.greenBright('Database seeded successfully'))

process.exit()
