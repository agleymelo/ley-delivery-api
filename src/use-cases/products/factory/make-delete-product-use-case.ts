import { DrizzleProductsRepository } from '../../../repositories/drizzle/drizzle-products-repository'
import { DeleteProductUseCase } from '../admin/delete-product-use-case'

export function makeDeleteProductUseCase() {
  const repository = new DrizzleProductsRepository()
  const useCase = new DeleteProductUseCase(repository)

  return useCase
}
