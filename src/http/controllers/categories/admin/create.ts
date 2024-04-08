import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCategoryUseCase } from '../../../../use-cases/categories/factory/make-create-category-use-case'
import { CategoryAlreadyExistsError } from '../../../../use-cases/errors/category-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCategoryBodySchema = z.object({
    name: z.string(),
    status: z.enum(['active', 'inactive']).default('active'),
  })

  const { name, status } = createCategoryBodySchema.parse(request.body)

  try {
    const createCategoryUseCase = makeCreateCategoryUseCase()

    await createCategoryUseCase.execute({ name, status })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
