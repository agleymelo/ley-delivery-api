import { DrizzleCategoriesRepository } from '../../../repositories/drizzle/drizzle-categories-repository'
import { ListAllCategoriesUseCase } from '../list-all-categories.use-case'

export function makeListAllCategoriesUseCase() {
  const repository = new DrizzleCategoriesRepository()

  const useCase = new ListAllCategoriesUseCase(repository)

  return useCase
}
