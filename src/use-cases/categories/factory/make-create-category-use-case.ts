import { DrizzleCategoriesRepository } from '../../../repositories/drizzle/drizzle-categories-repository'
import { CreateCategoryUseCase } from '../create-category-use-case'

export function makeCreateCategoryUseCase() {
  const repository = new DrizzleCategoriesRepository()

  const useCase = new CreateCategoryUseCase(repository)

  return useCase
}
