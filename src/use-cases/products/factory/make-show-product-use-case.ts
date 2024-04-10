import { DrizzleProductsRepository } from '../../../repositories/drizzle/drizzle-products-repository'
import { ShowProductUseCase } from '../user/show-product-use-case'

export function makeShowProductUseCase() {
  const repository = new DrizzleProductsRepository()
  const useCase = new ShowProductUseCase(repository)

  return useCase
}
