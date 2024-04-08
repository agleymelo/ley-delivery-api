import { DrizzleCategoriesRepository } from '../../../repositories/drizzle/drizzle-categories-repository'
import { UpdateCategoryUseCase } from '../update-category-use-case'

export function makeUpdateCategoryUseCase() {
  const repository = new DrizzleCategoriesRepository()

  const useCase = new UpdateCategoryUseCase(repository)

  return useCase
}
