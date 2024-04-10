import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetAllOrdersUserUseCase } from '../../../../use-cases/orders/factory/make-get-all-orders-user-use-case'

export async function getAllOrdersUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllOrdersUserQuerySchema = z.object({
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

  const { status, pageIndex } = getAllOrdersUserQuerySchema.parse(request.query)
  const userId = request.user.sub

  const getAllOrdersUserUseCase = makeGetAllOrdersUserUseCase()

  const { orders, meta } = await getAllOrdersUserUseCase.execute({
    userId,
    status: status ?? '',
    pageIndex: pageIndex ?? 0,
  })

  return reply.status(200).send({ orders, meta })
}
