import type { ProductRepository } from '../../../repositories/repository/products-repository'

type ListProductsUseCaseResponse = {
  categoryId: string | undefined
  pageIndex: number
}

export class ListProductsUseCase {
  constructor(private productsRepository: ProductRepository) {}

  async execute({ pageIndex, categoryId }: ListProductsUseCaseResponse) {
    const result = await this.productsRepository.listAllProducts(
      categoryId,
      pageIndex,
    )

    return { result }
  }
}
