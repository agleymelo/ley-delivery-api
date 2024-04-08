/* eslint-disable drizzle/enforce-delete-with-where */
import type { FastifyInstance } from 'fastify'
import { show } from './show'
import { create } from './create'
import { update } from './update'
import { remove } from './remove'
import { verifyJWT } from '../../../middlewares/verify-jwt'
import { verifyUserRole } from '../../../middlewares/verify-user-role'
import { list } from './list'

export async function categoriesRoutesAdmin(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/', list)
  app.get('/:categoryId', show)

  app.post('/', { onRequest: verifyUserRole('admin') }, create)

  app.put('/:categoryId', update)

  app.delete('/:categoryId', remove)
}
