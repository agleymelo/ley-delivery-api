import { DrizzleProductsRepository } from '../../../repositories/drizzle/drizzle-products-repository'
import { GetAllProductsUseCase } from '../admin/get-all-products-use-case'

export function makeGetAllProductsUseCase() {
  const repository = new DrizzleProductsRepository()
  const useCase = new GetAllProductsUseCase(repository)

  return useCase
}
