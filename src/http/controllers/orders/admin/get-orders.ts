import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetOrdersUseCase } from '../../../../use-cases/orders/factory/make-get-orders-use-case'

export async function getOrders(request: FastifyRequest, reply: FastifyReply) {
  const showOrderDetailsUserParamsSchema = z.object({
    orderId: z.optional(z.string()),
    customerName: z.optional(z.string()),
    status: z.optional(
      z.enum([
        'pending',
        'processing',
        'delivering',
        'delivered',
        'cancelled',
        '',
      ]),
    ),
    pageIndex: z.string().transform(Number),
  })

  const { orderId, customerName, status, pageIndex } =
    showOrderDetailsUserParamsSchema.parse(request.query)

  const getOrdersUseCase = makeGetOrdersUseCase()

  const { results } = await getOrdersUseCase.execute({
    orderId: orderId ?? '',
    customerName: customerName ?? '',
    status: status ?? '',
    pageIndex: pageIndex ?? 0,
  })

  return reply.status(200).send({ results })
}
