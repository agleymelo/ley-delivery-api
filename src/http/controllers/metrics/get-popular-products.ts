import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetPopularProductsUseCase } from '../../../use-cases/metrics/factory/make-get-popular-products-use-case'

export async function getPopularProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getPopularProductsUseCase = makeGetPopularProductsUseCase()

    const { popularProducts } = await getPopularProductsUseCase.execute()

    return reply.status(200).send({ popularProducts })
  } catch (err) {
    console.log(err)
  }
}
