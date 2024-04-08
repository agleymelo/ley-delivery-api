import { DrizzleCategoriesRepository } from '../../../repositories/drizzle/drizzle-categories-repository'
import { ListAllCategoriesAdminUseCase } from '../list-all-categories-admin.use-case'

export function makeListAllCategoriesAdminUseCase() {
  const repository = new DrizzleCategoriesRepository()

  const useCase = new ListAllCategoriesAdminUseCase(repository)

  return useCase
}
