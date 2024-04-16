import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'
import { makeShowProductUseCase } from '../../../../use-cases/products/factory/make-show-product-use-case'
import { env } from '../../../../env/env'

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

    console.log(product.id)
    console.log(product.name)
    console.log(product.image)

    return reply.status(200).send({
      product: {
        ...product,
        image: product.image
          ? `${env.CLOUDFLARE_URL_STORAGE}/${product.image}`
          : null,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
