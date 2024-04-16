import { GetObjectCommand } from '@aws-sdk/client-s3'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { env } from '../../../../env/env'
import { r2 } from '../../../../lib/cloudflare'

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

    const imagensArray = []

    for (const item of product.images) {
      const imagem = new GetObjectCommand({
        Bucket: 'ley-delivery',
        Key: item,
      })
      await r2.send(imagem)

      imagensArray.push(imagem.input)
    }

    const formmatedImages = imagensArray.map((item) => {
      return `${env.CLOUFLARE_URL_STORAGE}/${item.Key}`
    })

    return reply.status(200).send({
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        priceInCents: product.priceInCents,
        categoryId: product.categoryId,
        images: formmatedImages,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
