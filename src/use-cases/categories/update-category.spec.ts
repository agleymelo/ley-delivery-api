import { describe, beforeEach, it, expect } from 'vitest'

import { InMemoryCategoriesRepository } from '../../repositories/in-memory/in-memory-categories-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UpdateCategoryUseCase } from './update-category-use-case'

let categoriesRepository: InMemoryCategoriesRepository
let sut: UpdateCategoryUseCase

describe('Update Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new UpdateCategoryUseCase(categoriesRepository)
  })

  it('should to be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be able to update a specific category', async () => {
    const createdCategory = await categoriesRepository.create({
      name: 'Coffee',
      status: "active",
    })

    const { category } = await sut.execute({
      id: createdCategory.id,
      name: 'American Coffee',
      active: false,
    })

    expect(category).toHaveProperty('id')
    expect(category.id).toEqual(expect.any(String))
    expect(category.name).toEqual('American Coffee')
    expect(category.active).toBeFalsy()
  })

  it('should not be able to update a specific category if does not exists', async () => {
    await expect(() =>
      sut.execute({
        id: 'invalid-id',
        name: 'American Coffee',
        active: false,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
