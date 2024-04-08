import type { CategoriesRepository } from '../../repositories/repository/categories-repository'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'

type CreateCategoryUseCaseRequest = {
  name: string
  status: 'active' | 'inactive'
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ name, status }: CreateCategoryUseCaseRequest) {
    const categoryAlreadyExists =
      await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoriesRepository.create({
      name,
      status,
    })

    return { category }
  }
}
