import type { ProductsRepository } from '../../../repositories/repository/products-repository'
import type { UploadFilesRepository } from '../../../repositories/repository/providers/upload-files-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type UpdatePhotoProductUseCaseResponse = {
  productId: string
  fileName: string
}

export class UpdatePhotoProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private uploadFilesRepository: UploadFilesRepository,
  ) {}

  async execute({ productId, fileName }: UpdatePhotoProductUseCaseResponse) {
    const product = await this.productsRepository.findProductById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    if (product.image) {
      await this.uploadFilesRepository.deleteFile(product.image)
    }

    await this.uploadFilesRepository.saveFile(fileName)

    product.image = fileName

    console.log(product)

    await this.productsRepository.updateProduct(product)

    return { product }
  }
}
