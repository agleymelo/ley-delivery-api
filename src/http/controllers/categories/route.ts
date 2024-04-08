import type { FastifyInstance } from 'fastify'

import { list } from './list'

import { categoriesRoutesAdmin } from './admin/route'

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/', list)

  app.register(categoriesRoutesAdmin, { prefix: '/admin' })
}
