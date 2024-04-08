import { DrizzleCategoriesRepository } from '../../../repositories/drizzle/drizzle-categories-repository'
import { ShowCategoryUseCase } from '../show-category-use-case'

export function makeShowCategoryUseCase() {
  const repository = new DrizzleCategoriesRepository()

  const useCase = new ShowCategoryUseCase(repository)

  return useCase
}
