import type { FastifyInstance } from 'fastify'
import { ordersUserRoutes } from './users/route'
import { ordersAdminRoutes } from './admin/route'

export async function ordersRoutes(app: FastifyInstance) {
  app.register(ordersUserRoutes)

  app.register(ordersAdminRoutes, {
    prefix: '/admin',
  })
}
