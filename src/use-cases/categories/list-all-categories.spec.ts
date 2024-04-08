import { describe, beforeEach, it, expect } from 'vitest'

import { InMemoryCategoriesRepository } from '../../repositories/in-memory/in-memory-categories-repository'
import { ListAllCategoriesUseCase } from './list-all-categories.use-case'

let categoriesRepository: InMemoryCategoriesRepository
let sut: ListAllCategoriesUseCase

describe('List All Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new ListAllCategoriesUseCase(categoriesRepository)
  })

  it('should to be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be able to show a specific category', async () => {
    const categoryOne = await categoriesRepository.create({
      name: 'Coffee',
      status: 'active',
    })

    const categoryTwo = await categoriesRepository.create({
      name: 'Drinks',
      status: 'active',
    })

    await categoriesRepository.create({
      name: 'Breeds',
      status: 'inactive',
    })

    const { categories } = await sut.execute()

    expect(categories).toHaveLength(2)
    expect(categories).toEqual([
      expect.objectContaining({
        id: categoryOne.id,
        name: 'Coffee',
        status: 'active',
      }),
      expect.objectContaining({
        id: categoryTwo.id,
        name: 'Drinks',
        status: 'active',
      }),
    ])
  })
})
