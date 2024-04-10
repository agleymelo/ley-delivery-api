import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetOrderDetailsUserUseCase } from '../../../../use-cases/orders/factory/make-get-order-details-user-use-case'
import { ResourceNotFoundError } from '../../../../use-cases/errors/resource-not-found-error'

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const showOrderDetailsUserParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = showOrderDetailsUserParamsSchema.parse(request.params)
  const userId = request.user.sub

  try {
    const getOrderDetailsUserUseCase = makeGetOrderDetailsUserUseCase()

    const { order } = await getOrderDetailsUserUseCase.execute({
      orderId,
      userId,
    })

    return reply.status(200).send({ order })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
