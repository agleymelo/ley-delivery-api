import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateCategoryUseCase } from '../../../../use-cases/categories/factory/make-update-category-use-case'
import { CategoryAlreadyExistsError } from '../../../../use-cases/errors/category-already-exists-error'
import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateCategoryParamsSchema = z.object({
    categoryId: z.string(),
  })

  const updateCategoryBodySchema = z.object({
    name: z.string(),
    status: z.enum(['active', 'inactive']).default('active'),
  })

  const { categoryId } = updateCategoryParamsSchema.parse(request.params)
  const { name, status } = updateCategoryBodySchema.parse(request.body)

  try {
    const updateCategoryUseCase = makeUpdateCategoryUseCase()

    await updateCategoryUseCase.execute({ id: categoryId, name, status })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
