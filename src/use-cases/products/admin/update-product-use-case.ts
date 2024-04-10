import type { ProductRepository } from '../../../repositories/repository/products-repository'
import { ProductAlreadyExistsError } from '../../errors/product-already-exists-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type UpdateProductUseCaseResponse = {
  productId: string
  name: string
  description?: string
  priceInCents?: number
  categoryId?: string
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductRepository) {}

  async execute({
    productId,
    name,
    description,
    priceInCents,
    categoryId,
  }: UpdateProductUseCaseResponse) {
    const product = await this.productsRepository.findProductById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    const productWithSameName =
      await this.productsRepository.findProductByName(name)

    if (productWithSameName && productWithSameName.id !== product.id) {
      throw new ProductAlreadyExistsError()
    }

    product.name = name ?? product.name
    product.description = description ?? product.description
    product.priceInCents = priceInCents ?? product.priceInCents
    product.categoryId = categoryId ?? product.categoryId

    await this.productsRepository.updateProduct(product)

    return { product }
  }
}
