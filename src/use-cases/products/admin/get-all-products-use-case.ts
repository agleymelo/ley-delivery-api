import type { ProductsRepository } from '../../../repositories/repository/products-repository'

type GetAllProductsUseCaseResponse = {
  productId: string | undefined
  name: string | undefined
  pageIndex: number
}

export class GetAllProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ productId, name, pageIndex }: GetAllProductsUseCaseResponse) {
    const result = await this.productsRepository.getAllProducts(
      productId,
      name,
      pageIndex,
    )

    return { result }
  }
}
