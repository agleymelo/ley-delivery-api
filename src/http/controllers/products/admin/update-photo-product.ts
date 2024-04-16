import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'

import { makeUpdatePhotoProductUseCase } from '../../../../use-cases/products/factory/make-update-photo-product-use-case'

export async function updatePhotoProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProductParamsSchema = z.object({
    productId: z.string(),
  })

  const { productId } = updateProductParamsSchema.parse(request.params)

  try {
    const updatePhotoProductUseCase = makeUpdatePhotoProductUseCase()

    await updatePhotoProductUseCase.execute({
      productId,
      fileName: request.file.filename,
    })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
