import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'

import { makeUpdatePhotoProductUseCase } from '../../../../use-cases/products/factory/make-update-photo-product-use-case'
import { ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { r2 } from '../../../../lib/cloudflare'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '../../../../env/env'

import { createReadStream } from 'node:fs'

export async function updatePhotoProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProductParamsSchema = z.object({
    productId: z.string(),
  })

  const { productId } = updateProductParamsSchema.parse(request.params)

  try {
    const imagem = createReadStream(request.file.path)

    console.log(imagem)

    const putObjectCommand = new PutObjectCommand({
      Bucket: 'ley-delivery',
      Key: request.file.filename,
      ContentType: request.file.mimetype,
      Body: imagem,
    })

    await r2.send(putObjectCommand)

    const updatePhotoProductUseCase = makeUpdatePhotoProductUseCase()

    await updatePhotoProductUseCase.execute({
      productId,
      filesName: [request.file.filename],
    })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
