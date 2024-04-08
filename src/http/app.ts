import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'

import { usersRoutes } from './controllers/users/route'
import { env } from '../env/env'

export const app = fastify()

app.register(fastifyCors)

app.register(fastifyJwt, {
  secret: env.AUTH_SECRET,
})

app.register(usersRoutes, {
  prefix: '/users',
})
