import type { CategoriesRepository } from '../../repositories/repository/categories-repository'

export class ListAllCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute() {
    const categories = await this.categoriesRepository.allAvailableCategories()

    return { categories }
  }
}
