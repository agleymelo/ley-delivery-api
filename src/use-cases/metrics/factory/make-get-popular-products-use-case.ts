import { DrizzleMetricsRepository } from '../../../repositories/drizzle/drizzle-metrics-repository'
import { GetPopularProductsUseCase } from '../admin/get-popular-products-use-case'

export function makeGetPopularProductsUseCase() {
  const repository = new DrizzleMetricsRepository()

  const useCase = new GetPopularProductsUseCase(repository)

  return useCase
}
