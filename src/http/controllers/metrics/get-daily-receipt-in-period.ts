import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetDailyReceiptInPeriodUseCase } from '../../../use-cases/metrics/factory/make-get-daily-receipt-in-period-use-case'
import { z } from 'zod'

export async function getDailyReceiptInPeriod(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getDailyReceiptInPeriodQuerySchema = z.object({
    from: z.string().optional(),
    to: z.string().optional(),
  })

  const { from, to } = getDailyReceiptInPeriodQuerySchema.parse(request.query)

  try {
    const getDailyReceiptInPeriodUseCase = makeGetDailyReceiptInPeriodUseCase()

    const dailyReceiptInPeriod = await getDailyReceiptInPeriodUseCase.execute({
      from,
      to,
    })

    return reply.status(200).send(dailyReceiptInPeriod)
  } catch (err) {
    console.log(err)
  }
}
