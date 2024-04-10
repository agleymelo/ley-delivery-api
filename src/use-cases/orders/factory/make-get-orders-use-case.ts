import { DrizzleOrdersRepository } from '../../../repositories/drizzle/drizzle-orders-repository'
import { GetOrdersUseCase } from '../admin/get-orders-use-case'

export function makeGetOrdersUseCase() {
  const repository = new DrizzleOrdersRepository()

  const useCase = new GetOrdersUseCase(repository)

  return useCase
}
