import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDispatchOrderUseCase } from '../../../../use-cases/orders/factory/make-dispatch-use-case'
import { YouCannotDeliverOrdersInDispatchStatusError } from '../../../../use-cases/errors/you-cannot-deliver-orders-in-dispatch-status-error'

export async function dispatch(request: FastifyRequest, reply: FastifyReply) {
  const approveOrderParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = approveOrderParamsSchema.parse(request.params)

  try {
    const dispatchOrderUseCase = makeDispatchOrderUseCase()

    await dispatchOrderUseCase.execute({
      orderId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof YouCannotDeliverOrdersInDispatchStatusError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
