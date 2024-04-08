import { describe, beforeEach, it, expect } from 'vitest'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { DeleteCategoryUseCase } from './delete-category-use-case'
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/in-memory-categories-repository'

let categoriesRepository: InMemoryCategoriesRepository
let sut: DeleteCategoryUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new DeleteCategoryUseCase(categoriesRepository)
  })

  it('should to be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be able to delete a category', async () => {
    const createdCategory = await categoriesRepository.create({
      name: 'Coffee',
      status: 'active',
    })

    await sut.execute({
      categoryId: createdCategory.id,
    })

    const findCategoryDeleted = await categoriesRepository.findById(
      createdCategory.id,
    )

    expect(findCategoryDeleted).toBeNull()
  })

  it("should not be able to delete a category that doesn't exist", async () => {
    await expect(
      sut.execute({
        categoryId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
