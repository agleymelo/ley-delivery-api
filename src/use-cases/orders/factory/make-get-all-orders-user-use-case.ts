import { DrizzleOrdersRepository } from '../../../repositories/drizzle/drizzle-orders-repository'
import { GetAllOrdersUserUseCase } from '../users/get-all-orders-user-use-case'

export function makeGetAllOrdersUserUseCase() {
  const repository = new DrizzleOrdersRepository()

  const useCase = new GetAllOrdersUserUseCase(repository)

  return useCase
}
