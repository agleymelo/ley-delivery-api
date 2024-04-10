import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ProductAlreadyExistsError } from '../../../../use-cases/errors/product-already-exists-error'
import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'
import { makeUpdateProductUseCase } from '../../../../use-cases/products/factory/make-update-product-use-case'

export async function updateProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProductParamsSchema = z.object({
    productId: z.string(),
  })

  const updateProductBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    priceInCents: z.number().optional(),
    categoryId: z.string().optional(),
  })

  const { productId } = updateProductParamsSchema.parse(request.params)
  const { name, description, priceInCents, categoryId } =
    updateProductBodySchema.parse(request.body)

  try {
    const updateProductUseCase = makeUpdateProductUseCase()

    const {
      product: { id },
    } = await updateProductUseCase.execute({
      productId,
      name,
      description,
      priceInCents,
      categoryId,
    })

    return reply.status(200).send({ id })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
