import type { FastifyInstance } from 'fastify'
import { productAdminRoutes } from './admin/route'

export async function productsRoutes(app: FastifyInstance) {
  app.register(productAdminRoutes, {
    prefix: '/admin',
  })
}
