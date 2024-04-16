import dayjs from 'dayjs'
import type { MetricsRepository } from '../../../repositories/repository/metrics-repository'

export class GetDayOrdersAmountUseCase {
  constructor(private metricsRepository: MetricsRepository) {}

  async execute() {
    const today = dayjs()
    const yesterday = today.subtract(1, 'day')
    const startOfYesterday = yesterday.startOf('day')

    const yesterdayWithMonthAndYear = yesterday.format('YYYY-MM-DD')
    const todayWithMonthAndYear = today.format('YYYY-MM-DD')

    const ordersPerDay = await this.metricsRepository.getDayOrdersAmount(
      startOfYesterday.toDate(),
    )

    const todayOrdersAmount = ordersPerDay.find((orderInDay) => {
      return orderInDay.dayWithMonthAndYear === todayWithMonthAndYear
    })

    const yesterdayOrdersAmount = ordersPerDay.find((orderInDay) => {
      return orderInDay.dayWithMonthAndYear === yesterdayWithMonthAndYear
    })

    const diffFromYesterday =
      yesterdayOrdersAmount && todayOrdersAmount
        ? (todayOrdersAmount.amount * 100) / yesterdayOrdersAmount.amount
        : null

    return {
      amount: todayOrdersAmount?.amount ?? 0,
      diffFromYesterday: diffFromYesterday
        ? Number((diffFromYesterday - 100).toFixed(2))
        : 0,
    }
  }
}
