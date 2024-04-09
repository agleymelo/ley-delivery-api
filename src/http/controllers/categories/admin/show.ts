import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'
import { makeShowCategoryUseCase } from '../../../../use-cases/categories/factory/make-show-category-use-case'

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const showCategoryParamsSchema = z.object({
    categoryId: z.string(),
  })

  const { categoryId } = showCategoryParamsSchema.parse(request.params)

  try {
    const showCategoryUseCase = makeShowCategoryUseCase()

    const { category } = await showCategoryUseCase.execute({ id: categoryId })

    return reply.status(201).send({ category })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
