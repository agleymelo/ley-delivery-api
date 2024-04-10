import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'
import { makeGetAllProductsUseCase } from '../../../../use-cases/products/factory/make-get-all-products-use-case'

export async function getAllProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listProductParamsSchema = z.object({
    productId: z.optional(z.string()),
    name: z.optional(z.string()),
    pageIndex: z.string().transform(Number),
  })

  const { productId, name, pageIndex } = listProductParamsSchema.parse(
    request.query,
  )

  try {
    const getAllProductsUseCase = makeGetAllProductsUseCase()

    const { result } = await getAllProductsUseCase.execute({
      productId,
      name,
      pageIndex,
    })

    return reply
      .status(200)
      .send({ products: result.products, meta: result.meta })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
