import type { ProductRepository } from '../../../repositories/repository/products-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type DeleteProductUseCaseResponse = {
  productId: string
}

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductRepository) {}

  async execute({ productId }: DeleteProductUseCaseResponse) {
    const product = await this.productsRepository.findProductById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    await this.productsRepository.deleteProduct(productId)
  }
}
