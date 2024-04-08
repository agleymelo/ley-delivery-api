import type { CategoriesRepository } from '../../repositories/repository/categories-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type DeleteCategoryUseCaseRequest = {
  categoryId: string
}

export class DeleteCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ categoryId }: DeleteCategoryUseCaseRequest) {
    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await this.categoriesRepository.delete(categoryId)
  }
}
