import type { CategoriesRepository } from '../../repositories/repository/categories-repository'

type ListAllCategoriesAdminUseCaseResponse = {
  id: string
  name: string
  status: 'active' | 'inactive' | ''
  pageIndex: number
}

export class ListAllCategoriesAdminUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    id,
    name,
    status,
    pageIndex,
  }: ListAllCategoriesAdminUseCaseResponse) {
    const categories = await this.categoriesRepository.listAllCategories(
      id,
      name,
      status,
      pageIndex,
    )

    return { categories }
  }
}
