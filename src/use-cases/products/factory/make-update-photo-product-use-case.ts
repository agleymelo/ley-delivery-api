import { DrizzleProductsRepository } from '../../../repositories/drizzle/drizzle-products-repository'
import { R2CloudflareStorage } from '../../../repositories/providers/r2-cloudflare-storage'
import { UpdatePhotoProductUseCase } from '../admin/update-photo-product-use-case'

export function makeUpdatePhotoProductUseCase() {
  const repository = new DrizzleProductsRepository()
  // const uploadFileRepository = new DiskStorage()
  const uploadFileRepository = new R2CloudflareStorage()

  const useCase = new UpdatePhotoProductUseCase(
    repository,
    uploadFileRepository,
  )

  return useCase
}
