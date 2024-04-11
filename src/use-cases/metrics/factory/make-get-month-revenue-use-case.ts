import { DrizzleMetricsRepository } from '../../../repositories/drizzle/drizzle-metrics-repository'
import { GetMonthRevenueUseCase } from '../admin/get-month-revenue-use-case'

export function makeGetMonthRevenueUseCase() {
  const repository = new DrizzleMetricsRepository()

  const useCase = new GetMonthRevenueUseCase(repository)

  return useCase
}
