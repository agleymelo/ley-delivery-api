import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetMonthOrdersAmountUseCase } from '../../../use-cases/metrics/factory/make-get-month-orders-amount-use-case'

export async function getMonthOrdersAmount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getMonthOrdersAmountUseCase = makeGetMonthOrdersAmountUseCase()

    const { amount, diffFromLastMonth } =
      await getMonthOrdersAmountUseCase.execute()

    return reply.status(200).send({ amount, diffFromLastMonth })
  } catch (err) {
    console.log(err)
  }
}
