import { DrizzleProductsRepository } from '../../../repositories/drizzle/drizzle-products-repository'
import { CreateProductUseCase } from '../admin/create-product-use-case'

export function makeCreateProductUseCase() {
  const repository = new DrizzleProductsRepository()
  const useCase = new CreateProductUseCase(repository)

  return useCase
}
