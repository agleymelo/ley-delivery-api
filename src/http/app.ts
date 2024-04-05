import fastify from 'fastify'
import { usersRoutes } from './controllers/users/route'

export const app = fastify()

app.register(usersRoutes, {
  prefix: '/users',
})
