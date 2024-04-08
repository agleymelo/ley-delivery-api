import { describe, beforeEach, it, expect } from 'vitest'

import { InMemoryCategoriesRepository } from '../../repositories/in-memory/in-memory-categories-repository'
import { CreateCategoryUseCase } from './create-category-use-case'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'

let categoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoriesRepository)
  })

  it('should to be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be able to create a new category', async () => {
    const { category } = await sut.execute({
      name: 'Coffee',
      status: 'active',
    })

    expect(category).toHaveProperty('id')
    expect(category.id).toEqual(expect.any(String))
    expect(category.name).toEqual('Coffee')
  })

  it('should not be able to create a category already exists', async () => {
    const name = 'Coffee'

    await sut.execute({
      name,
      status: 'active',
    })

    await expect(() =>
      sut.execute({
        name,
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError)
  })
})
