import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../../middlewares/verify-jwt'
import { verifyUserRole } from '../../../middlewares/verify-user-role'

import { approve } from './approve'
import { cancel } from './cancel'
import { dispatch } from './dispatch'
import { deliver } from './deliver'
import { getOrders } from './get-orders'

export async function ordersAdminRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/', { onRequest: [verifyUserRole('admin')] }, getOrders)

  app.patch(
    '/:orderId/approve',
    { onRequest: [verifyUserRole('admin')] },
    approve,
  )
  app.patch(
    '/:orderId/cancel',
    { onRequest: [verifyUserRole('admin')] },
    cancel,
  )
  app.patch(
    '/:orderId/dispatch',
    { onRequest: [verifyUserRole('admin')] },
    dispatch,
  )
  app.patch(
    '/:orderId/deliver',
    { onRequest: [verifyUserRole('admin')] },
    deliver,
  )
}
