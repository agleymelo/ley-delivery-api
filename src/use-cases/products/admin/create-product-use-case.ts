import type { ProductRepository } from '../../../repositories/repository/products-repository'
import { ProductAlreadyExistsError } from '../../errors/product-already-exists-error'

type CreateProductUseCaseResponse = {
  name: string
  description?: string
  priceInCents: number
  images: string[]
  categoryId: string
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductRepository) {}

  async execute({
    name,
    description,
    priceInCents,
    images,
    categoryId,
  }: CreateProductUseCaseResponse) {
    const productAlreadyExists =
      await this.productsRepository.findProductByName(name)

    if (productAlreadyExists) {
      throw new ProductAlreadyExistsError()
    }

    const product = await this.productsRepository.createProduct({
      name,
      description,
      priceInCents,
      images,
      categoryId,
    })

    return { product }
  }
}
