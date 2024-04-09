import { DrizzleOrdersRepository } from '../../../repositories/drizzle/drizzle-orders-repository'
import { DispatchOrderUseCase } from '../admin/dispatch-order-use-case'

export function makeDispatchOrderUseCase() {
  const repository = new DrizzleOrdersRepository()

  const useCase = new DispatchOrderUseCase(repository)

  return useCase
}
