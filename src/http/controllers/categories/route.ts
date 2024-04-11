import type { FastifyInstance } from 'fastify'

import { list } from './list'

import { categoriesRoutesAdmin } from './admin/route'
import { showCategory } from './show-category'

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/', list)

  app.get('/:categoryId', showCategory)

  app.register(categoriesRoutesAdmin, { prefix: '/admin' })
}
