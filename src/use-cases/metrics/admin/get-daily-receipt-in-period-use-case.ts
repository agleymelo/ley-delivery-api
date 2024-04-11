import dayjs from 'dayjs'
import type { MetricsRepository } from '../../../repositories/repository/metrics-repository'

type GetDailyReceiptInPeriodUseCaseResponse = {
  from?: string
  to?: string
}

type GetDailyReceiptInPeriodUseCaseReply = {
  date: string
  receipt: number
}

export class GetDailyReceiptInPeriodUseCase {
  constructor(private metricsRepository: MetricsRepository) {}

  async execute({
    from,
    to,
  }: GetDailyReceiptInPeriodUseCaseResponse): Promise<
    GetDailyReceiptInPeriodUseCaseReply[]
  > {
    const startDate = from ? dayjs(from) : dayjs().subtract(7, 'days')

    const endDate = to ? dayjs(to) : from ? startDate.add(7, 'days') : dayjs()

    if (endDate.diff(startDate, 'days') > 7) {
      throw new Error('The period must be less than 7 days')
    }

    const dailyReceiptInPeriod =
      await this.metricsRepository.getDailyReceiptInPeriod(
        startDate.startOf('day').add(startDate.utcOffset(), 'minutes').toDate(),
        endDate.endOf('day').add(startDate.utcOffset(), 'minutes').toDate(),
      )

    return { dailyReceiptInPeriod }
  }
}
