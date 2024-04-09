import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../../middlewares/verify-jwt'
import { show } from './show'

export async function ordersUserRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/:orderId', show)
}
