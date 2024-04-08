import { describe, beforeEach, it, expect } from 'vitest'

import { InMemoryCategoriesRepository } from '../../repositories/in-memory/in-memory-categories-repository'
import { ShowCategoryUseCase } from './show-category-use-case'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let categoriesRepository: InMemoryCategoriesRepository
let sut: ShowCategoryUseCase

describe('Show Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new ShowCategoryUseCase(categoriesRepository)
  })

  it('should to be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be able to show a specific category', async () => {
    const createdCategory = await categoriesRepository.create({
      name: 'Coffee',
      status: 'active',
    })

    const { category } = await sut.execute({
      id: createdCategory.id,
    })

    expect(category).toHaveProperty('id')
    expect(category.id).toEqual(expect.any(String))
    expect(category.name).toEqual('Coffee')
    expect(category.status).toEqual('active')
  })

  it('should not be able to show a category if does not exists', async () => {
    await expect(() =>
      sut.execute({
        id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
