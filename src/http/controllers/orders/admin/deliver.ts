import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeliverOrderUseCase } from '../../../../use-cases/orders/factory/make-deliver-use-case'
import { YouCannotDeliverOrdersInDeliveringStatusError } from '../../../../use-cases/errors/you-cannot-deliver-orders-in-delivering-status-error'

export async function deliver(request: FastifyRequest, reply: FastifyReply) {
  const approveOrderParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = approveOrderParamsSchema.parse(request.params)

  try {
    const deliverOrderUseCase = makeDeliverOrderUseCase()

    await deliverOrderUseCase.execute({
      orderId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof YouCannotDeliverOrdersInDeliveringStatusError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
