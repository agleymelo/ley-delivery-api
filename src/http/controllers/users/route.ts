/* eslint-disable drizzle/enforce-delete-with-where */
import type { FastifyInstance } from 'fastify'

import { create } from './create'
import { profile } from './profile'
import { update } from './update'
import { remove } from './remove'
import { authenticate } from './authenticate'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', create)

  app.post('/sessions', authenticate)

  app.get('/profile', { onRequest: [verifyJWT] }, profile)
  app.put('/', { onRequest: [verifyJWT] }, update)
  app.delete('/', { onRequest: [verifyJWT] }, remove)
}
