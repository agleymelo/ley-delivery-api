import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'
import { makeDeleteProductUseCase } from '../../../../use-cases/products/factory/make-delete-product-use-case'

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteProductParamsSchema = z.object({
    productId: z.string(),
  })

  const { productId } = deleteProductParamsSchema.parse(request.params)

  try {
    const deleteProductUseCase = makeDeleteProductUseCase()

    await deleteProductUseCase.execute({
      productId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
