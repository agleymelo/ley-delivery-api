import { DrizzleCategoriesRepository } from '../../../repositories/drizzle/drizzle-categories-repository'
import { DeleteCategoryUseCase } from '../delete-category-use-case'

export function makeDeleteCategoryUseCase() {
  const repository = new DrizzleCategoriesRepository()

  const useCase = new DeleteCategoryUseCase(repository)

  return useCase
}
