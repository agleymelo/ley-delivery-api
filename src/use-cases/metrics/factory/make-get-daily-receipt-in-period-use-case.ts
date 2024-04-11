import { DrizzleMetricsRepository } from '../../../repositories/drizzle/drizzle-metrics-repository'
import { GetDailyReceiptInPeriodUseCase } from '../admin/get-daily-receipt-in-period-use-case'

export function makeGetDailyReceiptInPeriodUseCase() {
  const repository = new DrizzleMetricsRepository()

  const useCase = new GetDailyReceiptInPeriodUseCase(repository)

  return useCase
}
