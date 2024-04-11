import { DrizzleMetricsRepository } from '../../../repositories/drizzle/drizzle-metrics-repository'
import { GetMonthCancelledOrdersAmountUseCase } from '../admin/get-month-cancelled-orders-amount-use-case'

export function makeGetMonthCancelledOrdersAmountUseCase() {
  const repository = new DrizzleMetricsRepository()

  const useCase = new GetMonthCancelledOrdersAmountUseCase(repository)

  return useCase
}
