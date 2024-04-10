import { DrizzleProductsRepository } from '../../../repositories/drizzle/drizzle-products-repository'
import { UpdateProductUseCase } from '../admin/update-product-use-case'

export function makeUpdateProductUseCase() {
  const repository = new DrizzleProductsRepository()
  const useCase = new UpdateProductUseCase(repository)

  return useCase
}
