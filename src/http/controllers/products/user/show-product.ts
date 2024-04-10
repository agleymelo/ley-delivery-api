import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'
import { makeShowProductUseCase } from '../../../../use-cases/products/factory/make-show-product-use-case'

export async function showProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const showProductParamsSchema = z.object({
    productId: z.string(),
  })

  const { productId } = showProductParamsSchema.parse(request.params)

  try {
    const showProductUseCase = makeShowProductUseCase()

    const { product } = await showProductUseCase.execute({
      productId,
    })

    return reply.status(200).send({ product })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
