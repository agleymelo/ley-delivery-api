import type { Category } from '../../dtos/categories/category'
import type { CreateCategoryInput } from '../../dtos/categories/create-category-input'
import type { CategoriesRepository } from '../repository/categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  async listAllCategories(
    id: string,
    name: string,
    active: boolean,
    pageIndex: number,
  ): Promise<{
    categories: Category[]
    meta: { pageIndex: number; perPage: number; totalCount: number }
  }> {
    const categories = this.categories.filter((category) => {
      if (id && category.id !== id) {
        return false
      }

      if (name && category.name !== name) {
        return false
      }

      if (active && category.status !== 'active') {
        return false
      }

      return true
    })

    const perPage = 10
    const totalCount = categories.length
    const start = pageIndex * perPage
    const end = start + perPage

    return {
      categories: categories.slice(start, end),
      meta: {
        pageIndex,
        perPage,
        totalCount,
      },
    }
  }

  async allAvailableCategories(): Promise<Category[]> {
    return this.categories.filter((category) => category.status === 'active')
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id)

    if (!category) {
      return null
    }

    return category
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name)

    if (!category) {
      return null
    }

    return category
  }

  async create(data: CreateCategoryInput): Promise<Category> {
    const category: Category = {
      id: Math.random().toString(),
      name: data.name,
      status: data.status,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.categories.push(category)

    return category
  }

  async save(category: Category): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      (categoryItem) => categoryItem.id === category.id,
    )

    this.categories[categoryIndex] = category

    return category
  }

  async delete(categoryId: string): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === categoryId,
    )

    this.categories.splice(categoryIndex, 1)
  }
}
