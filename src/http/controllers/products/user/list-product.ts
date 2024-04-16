import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'
import { makeListProductsUseCase } from '../../../../use-cases/products/factory/make-list-products-use-case'

export async function listProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listProductParamsSchema = z.object({
    categoryId: z.string().optional(),
    pageIndex: z.string().transform(Number),
  })

  const { categoryId, pageIndex } = listProductParamsSchema.parse(request.query)

  try {
    const listProductsUseCase = makeListProductsUseCase()

    const { result } = await listProductsUseCase.execute({
      categoryId,
      pageIndex,
    })

    const formattedProducts = result.products.map((product) => {
      return {
        ...product,
        image: product.image ? `${product.image}` : null,
      }
    })

    return reply
      .status(200)
      .send({ products: formattedProducts, meta: result.meta })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
