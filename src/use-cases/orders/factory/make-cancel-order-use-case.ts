import { DrizzleOrdersRepository } from '../../../repositories/drizzle/drizzle-orders-repository'
import { CancelOrderUseCase } from '../admin/cancel-order-use-case'

export function makeCancelOrderUseCase() {
  const repository = new DrizzleOrdersRepository()

  const useCase = new CancelOrderUseCase(repository)

  return useCase
}
