import type { Category } from '../../dtos/categories/category'
import type { CreateCategoryInput } from '../../dtos/categories/create-category-input'

export interface CategoriesRepository {
  listAllCategories(
    id: string,
    name: string,
    status: 'active' | 'inactive' | undefined,
    pageIndex: number,
  ): Promise<{
    categories: Category[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number
    }
  }>
  allAvailableCategories(): Promise<Category[]>
  findById(id: string): Promise<Category | null>
  findByName(name: string): Promise<Category | null>
  create(data: CreateCategoryInput): Promise<Category>
  save(category: Category): Promise<Category>
  delete(categoryId: string): Promise<void>
}
