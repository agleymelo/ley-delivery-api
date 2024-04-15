/* eslint-disable drizzle/enforce-delete-with-where */
import type { FastifyInstance } from 'fastify'

import { create } from './create'

import { getProfile } from './profile'
import { updateUser } from './update'
import { removeUser } from './remove'
import { authenticate } from './authenticate'

import { verifyJWT } from '../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', create)

  app.post('/sessions', authenticate)

  app.get('/profile', { onRequest: [verifyJWT] }, getProfile)
  app.put('/', { onRequest: [verifyJWT] }, updateUser)
  app.delete('/', { onRequest: [verifyJWT] }, removeUser)
}
