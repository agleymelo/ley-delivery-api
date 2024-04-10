import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { YouCannotCancelOrdersAfterDispatchError } from '../../../../use-cases/errors/you-cannot-cancel-orders-after-dispatch-error'
import { makeCancelOrderUseCase } from '../../../../use-cases/orders/factory/make-cancel-order-use-case'

export async function cancel(request: FastifyRequest, reply: FastifyReply) {
  const approveOrderParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = approveOrderParamsSchema.parse(request.params)

  try {
    const cancelOrderUseCase = makeCancelOrderUseCase()

    await cancelOrderUseCase.execute({
      orderId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof YouCannotCancelOrdersAfterDispatchError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
