import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'

import { env } from '../env/env'

import { usersRoutes } from './controllers/users/route'
import { categoriesRoutes } from './controllers/categories/route'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyCors)

app.register(fastifyJwt, {
  secret: env.AUTH_SECRET,
})

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(categoriesRoutes, {
  prefix: '/categories',
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
