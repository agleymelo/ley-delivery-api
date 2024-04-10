import type { FastifyInstance } from 'fastify'
import { productAdminRoutes } from './admin/route'
import { listProduct } from './user/list-product'
import { showProduct } from './user/show-product'

export async function productsRoutes(app: FastifyInstance) {
  app.get('/', listProduct)
  app.get('/:productId', showProduct)

  app.register(productAdminRoutes, {
    prefix: '/admin',
  })
}
