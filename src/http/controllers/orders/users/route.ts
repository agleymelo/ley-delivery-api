import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../../middlewares/verify-jwt'
import { show } from './show'
import { getAllOrdersUser } from './get-all-orders'

export async function ordersUserRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/', getAllOrdersUser)
  app.get('/:orderId', show)
}
