import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateOrderUserUseCase } from '../../../../use-cases/orders/factory/make-create-order-user-use-case'
import { ProductPriceDoestNotMatchError } from '../../../../use-cases/errors/product-price-does-not-match-error'

export async function createOrderUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrderUserBodySchema = z.object({
    totalInCents: z.number(),
    orderItems: z.array(
      z.object({
        id: z.string(),
        totalInCents: z.number(),
        quantity: z.number(),
      }),
    ),
  })

  const userId = request.user.sub
  const { totalInCents, orderItems } = createOrderUserBodySchema.parse(
    request.body,
  )

  try {
    const createOrderUserUseCase = makeCreateOrderUserUseCase()

    await createOrderUserUseCase.execute({
      userId,
      totalInCents,
      orderItems,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ProductPriceDoestNotMatchError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}
