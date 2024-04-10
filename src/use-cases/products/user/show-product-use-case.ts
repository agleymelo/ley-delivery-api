import type { ProductsRepository } from '../../../repositories/repository/products-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type ShowProductUseCaseResponse = {
  productId: string
}

export class ShowProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ productId }: ShowProductUseCaseResponse) {
    const product = await this.productsRepository.findProductById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    return { product }
  }
}
