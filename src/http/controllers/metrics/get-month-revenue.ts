import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetMonthRevenueUseCase } from '../../../use-cases/metrics/factory/make-get-month-revenue-use-case'

export async function getMonthRevenue(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getMonthRevenueUseCase = makeGetMonthRevenueUseCase()

    const { receipt, diffFromLastMonth } =
      await getMonthRevenueUseCase.execute()

    return reply.status(200).send({ receipt, diffFromLastMonth })
  } catch (err) {
    console.log(err)
  }
}
