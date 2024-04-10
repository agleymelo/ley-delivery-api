import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateProductUseCase } from '../../../../use-cases/products/factory/make-create-product-use-case'
import { ProductAlreadyExistsError } from '../../../../use-cases/errors/product-already-exists-error'

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProductBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    priceInCents: z.number(),
    images: z.array(z.string()),
    categoryId: z.string(),
  })

  const { name, description, priceInCents, images, categoryId } =
    createProductBodySchema.parse(request.body)

  try {
    const createProductUseCase = makeCreateProductUseCase()

    const {
      product: { id },
    } = await createProductUseCase.execute({
      name,
      description,
      priceInCents,
      images,
      categoryId,
    })

    return reply.status(201).send({ id })
  } catch (err) {
    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
