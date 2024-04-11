import { and, count, desc, eq, ilike } from 'drizzle-orm'
import { db } from '../../database/connection'
import type { Category } from '../../dtos/categories/category'
import type { CreateCategoryInput } from '../../dtos/categories/create-category-input'
import type { CategoriesRepository } from '../repository/categories-repository'
import { categories } from '../../database/schema'

export class DrizzleCategoriesRepository implements CategoriesRepository {
  async listAllCategories(
    id: string,
    name: string,
    status: 'active' | 'inactive',
    pageIndex: number,
  ): Promise<{
    categories: Category[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number
    }
  }> {
    const [[{ count: amountOfCategories }], allCategories] = await Promise.all([
      db.select({ count: count() }).from(categories),
      db
        .select()
        .from(categories)
        .where(
          and(
            id ? eq(categories.id, id) : undefined,
            name ? ilike(categories.name, `%${name}%`) : undefined,
            status ? eq(categories.status, status) : undefined,
          ),
        )
        .offset(pageIndex * 9)
        .limit(9)
        .orderBy(desc(categories.name)),
    ])

    return {
      categories: allCategories,
      meta: {
        pageIndex,
        perPage: 9,
        totalCount: amountOfCategories,
      },
    }
  }

  async allAvailableCategories(): Promise<Category[]> {
    return await db
      .select()
      .from(categories)
      .where(eq(categories.status, 'active'))
  }

  async findById(id: string): Promise<Category | null> {
    const category = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    })

    if (!category) {
      return null
    }

    return category
  }

  async findByName(name: string): Promise<Category | null> {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.name, name))

    return category
  }

  async create(data: CreateCategoryInput): Promise<Category> {
    const [category] = await db.insert(categories).values({
      name: data.name,
      status: data.status,
    })

    return category
  }

  async save(category: Category): Promise<Category> {
    const [updatedCategory] = await db
      .update(categories)
      .set({
        name: category.name,
        status: category.status,
      })
      .where(eq(categories.id, category.id))

    return updatedCategory
  }

  async delete(categoryId: string): Promise<void> {
    await db.delete(categories).where(eq(categories.id, categoryId))
  }
}
