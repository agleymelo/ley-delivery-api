import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListAllCategoriesAdminUseCase } from '../../../../use-cases/categories/factory/make-list-all-categories-admin-use-case'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listAllCategoriesAdminQuerySchema = z.object({
    id: z.optional(z.string()),
    name: z.optional(z.string()),
    status: z.optional(z.enum(['active', 'inactive', ''])),
    pageIndex: z.string().transform(Number),
  })

  const { id, name, status, pageIndex } =
    listAllCategoriesAdminQuerySchema.parse(request.query)

  const listAllCategoriesAdminUseCase = makeListAllCategoriesAdminUseCase()

  const { result } = await listAllCategoriesAdminUseCase.execute({
    id: id ?? '',
    name: name ?? '',
    status: status ?? '',
    pageIndex: pageIndex ?? 0,
  })

  return reply
    .status(200)
    .send({ categories: result.categories, meta: result.meta })
}
