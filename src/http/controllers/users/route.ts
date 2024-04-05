/* eslint-disable drizzle/enforce-delete-with-where */
import type { FastifyInstance } from 'fastify'

import { create } from './create'
import { profile } from './profile'
import { update } from './update'
import { remove } from './remove'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', create)

  app.get('/profile/:userId', profile)
  app.put('/:userId', update)
  app.delete('/:userId', remove)
}
