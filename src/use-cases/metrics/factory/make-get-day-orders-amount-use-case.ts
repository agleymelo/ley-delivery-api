import { DrizzleMetricsRepository } from '../../../repositories/drizzle/drizzle-metrics-repository'
import { GetDayOrdersAmountUseCase } from '../admin/get-day-orders-amount-use-case'

export function makeGetDayOrdersAmountUseCase() {
  const repository = new DrizzleMetricsRepository()

  const useCase = new GetDayOrdersAmountUseCase(repository)

  return useCase
}
