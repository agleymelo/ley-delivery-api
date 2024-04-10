import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multer from 'fastify-multer'

import { env } from '../env/env'

import { ZodError } from 'zod'
import { categoriesRoutes } from './controllers/categories/route'
import { ordersRoutes } from './controllers/orders'
import { productsRoutes } from './controllers/products/route'
import { usersRoutes } from './controllers/users/route'

export const app = fastify()

app.register(fastifyCors)

app.register(multer.contentParser)

app.register(fastifyJwt, {
  secret: env.AUTH_SECRET,
})

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(categoriesRoutes, {
  prefix: '/categories',
})

app.register(ordersRoutes, {
  prefix: '/orders',
})

app.register(productsRoutes, {
  prefix: '/products',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  console.log(error)

  // if (env.NODE_ENV !== 'production') {
  //   console.error(error)
  // } else {
  //   // TODO: Here we sould log to an external toll like DataDog/NewRelic/Sentry
  // }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
