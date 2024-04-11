import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetMonthCancelledOrdersAmountUseCase } from '../../../use-cases/metrics/factory/make-get-month-cancelled-orders-amount-use-case'

export async function getMonthCancelledOrdersAmount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getMonthCancelledOrdersAmountUseCase =
      makeGetMonthCancelledOrdersAmountUseCase()

    const { amount, diffFromLastMonth } =
      await getMonthCancelledOrdersAmountUseCase.execute()

    return reply.status(200).send({ amount, diffFromLastMonth })
  } catch (err) {
    console.log(err)
  }
}
