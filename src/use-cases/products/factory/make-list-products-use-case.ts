import { DrizzleProductsRepository } from '../../../repositories/drizzle/drizzle-products-repository'
import { ListProductsUseCase } from '../user/list-products-use-case'

export function makeListProductsUseCase() {
  const repository = new DrizzleProductsRepository()
  const useCase = new ListProductsUseCase(repository)

  return useCase
}
