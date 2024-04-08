import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListAllCategoriesUseCase } from '../../../use-cases/categories/factory/make-list-all-categories-use-case'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listAllCategoriesUseCase = makeListAllCategoriesUseCase()

  const { categories } = await listAllCategoriesUseCase.execute()

  return reply.status(200).send({ categories })
}
