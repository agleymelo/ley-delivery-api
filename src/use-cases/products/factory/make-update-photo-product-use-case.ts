import { DrizzleProductsRepository } from '../../../repositories/drizzle/drizzle-products-repository'
import { DiskStorage } from '../../../repositories/providers/disk-storage'
import { UpdatePhotoProductUseCase } from '../admin/update-photo-product-use-case'

export function makeUpdatePhotoProductUseCase() {
  const repository = new DrizzleProductsRepository()
  const uploadFileRepository = new DiskStorage()

  const useCase = new UpdatePhotoProductUseCase(
    repository,
    uploadFileRepository,
  )

  return useCase
}
