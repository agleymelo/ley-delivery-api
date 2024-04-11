import type { MetricsRepository } from '../../../repositories/repository/metrics-repository'

export class GetPopularProductsUseCase {
  constructor(private metricsRepository: MetricsRepository) {}

  async execute() {
    const popularProducts = await this.metricsRepository.getPopularProducts()

    return { popularProducts }
  }
}
