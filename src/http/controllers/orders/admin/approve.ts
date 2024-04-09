import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeApproveOrderUseCase } from '../../../../use-cases/orders/factory/make-approve-order-use-case'
import { OrderIsNotPendingError } from '../../../../use-cases/errors/order-is-not-pending-error'

export async function approve(request: FastifyRequest, reply: FastifyReply) {
  const approveOrderParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = approveOrderParamsSchema.parse(request.params)

  try {
    const approveOrderUseCase = makeApproveOrderUseCase()

    await approveOrderUseCase.execute({
      orderId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof OrderIsNotPendingError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
