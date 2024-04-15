import type { ProductsRepository } from '../../../repositories/repository/products-repository'
import type { UploadFilesRepository } from '../../../repositories/repository/providers/upload-files-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type UpdatePhotoProductUseCaseResponse = {
  productId: string
  filesName: string[]
}

export class UpdatePhotoProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private uploadFilesRepository: UploadFilesRepository,
  ) {}

  async execute({ productId, filesName }: UpdatePhotoProductUseCaseResponse) {
    const product = await this.productsRepository.findProductById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    if (product.images) {
      product.images.map(async (image) => {
        await this.uploadFilesRepository.deleteFile(image)
      })
    }

    const newImageProduct = await Promise.all(
      filesName.map(async (file) => {
        await this.uploadFilesRepository.saveFile(file)

        return file
      }),
    )

    product.images = newImageProduct

    await this.productsRepository.updateProduct(product)

    await this.uploadFilesRepository.deleteFile(filesName[0])

    return { product }
  }
}
