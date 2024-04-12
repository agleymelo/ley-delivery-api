import { DrizzleOrdersRepository } from '../../../repositories/drizzle/drizzle-orders-repository'
import { DrizzleProductsRepository } from '../../../repositories/drizzle/drizzle-products-repository'
import { CreateOrderUserUseCase } from '../users/create-order-user-use-case'

export function makeCreateOrderUserUseCase() {
  const repository = new DrizzleOrdersRepository()
  const productRepository = new DrizzleProductsRepository()

  const useCase = new CreateOrderUserUseCase(productRepository, repository)

  return useCase
}
