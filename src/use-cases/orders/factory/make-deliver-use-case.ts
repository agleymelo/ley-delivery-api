import { DrizzleOrdersRepository } from '../../../repositories/drizzle/drizzle-orders-repository'
import { DeliverOrderUseCase } from '../admin/deliver-order-use-case'

export function makeDeliverOrderUseCase() {
  const repository = new DrizzleOrdersRepository()

  const useCase = new DeliverOrderUseCase(repository)

  return useCase
}
