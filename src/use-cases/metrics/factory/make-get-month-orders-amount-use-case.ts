import { DrizzleMetricsRepository } from '../../../repositories/drizzle/drizzle-metrics-repository'
import { GetMonthOrdersAmountUseCase } from '../admin/get-month-orders-amount-use-case'

export function makeGetMonthOrdersAmountUseCase() {
  const repository = new DrizzleMetricsRepository()

  const useCase = new GetMonthOrdersAmountUseCase(repository)

  return useCase
}
