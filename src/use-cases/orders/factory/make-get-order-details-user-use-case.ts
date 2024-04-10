import { DrizzleOrdersRepository } from '../../../repositories/drizzle/drizzle-orders-repository'
import { GetOrderDetailsUserUseCase } from '../users/get-order-details-user-use-case'

export function makeGetOrderDetailsUserUseCase() {
  const repository = new DrizzleOrdersRepository()

  const useCase = new GetOrderDetailsUserUseCase(repository)

  return useCase
}
