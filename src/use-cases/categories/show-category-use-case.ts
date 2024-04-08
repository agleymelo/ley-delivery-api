import type { CategoriesRepository } from '../../repositories/repository/categories-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type ShowCategoryUseCaseRequest = {
  id: string
}

export class ShowCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ id }: ShowCategoryUseCaseRequest) {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    return { category }
  }
}
