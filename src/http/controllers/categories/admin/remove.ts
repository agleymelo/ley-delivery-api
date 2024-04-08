import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'
import { makeDeleteCategoryUseCase } from '../../../../use-cases/categories/factory/make-delete-category-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeCategoryParamsSchema = z.object({
    categoryId: z.string(),
  })

  const { categoryId } = removeCategoryParamsSchema.parse(request.params)

  try {
    const deleteCategoryUseCase = makeDeleteCategoryUseCase()

    await deleteCategoryUseCase.execute({ categoryId })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
