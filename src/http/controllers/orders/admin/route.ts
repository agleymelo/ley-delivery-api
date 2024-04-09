import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../../middlewares/verify-jwt'
import { verifyUserRole } from '../../../middlewares/verify-user-role'
import { approve } from './approve'

export async function ordersAdminRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.patch(
    '/:orderId/approve',
    { onRequest: [verifyUserRole('admin')] },
    approve,
  )
}
