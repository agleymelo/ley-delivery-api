import type { CategoriesRepository } from '../../repositories/repository/categories-repository'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type UpdateCategoryUseCaseRequest = {
  id: string
  name: string
  status: 'active' | 'inactive'
}

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ id, name, status }: UpdateCategoryUseCaseRequest) {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    const categoryWithSameName =
      await this.categoriesRepository.findByName(name)

    if (categoryWithSameName && categoryWithSameName.name !== category.name) {
      throw new CategoryAlreadyExistsError()
    }

    category.name = name ?? category.name
    category.status = status ?? category.status

    await this.categoriesRepository.save(category)

    return { category }
  }
}
