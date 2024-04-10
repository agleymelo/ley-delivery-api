import type { FastifyInstance } from 'fastify'
import { showProduct } from './show-product'
import { listProduct } from './list-product'

export async function productUsersRoute(app: FastifyInstance) {
  app.get('/', listProduct)
  app.get('/:productId', showProduct)
}
