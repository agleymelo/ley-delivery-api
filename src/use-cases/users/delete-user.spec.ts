import { describe, beforeEach, it, expect } from 'vitest'

import { UsersRepositoryInMemory } from '../../repositories/in-memory/users-repository-in-memory'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

import { DeleteUserUseCase } from './delete-user-use-case'

let usersRepository: UsersRepositoryInMemory
let sut: DeleteUserUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should to be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be able to delete user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    await sut.execute({
      userId: createdUser.id,
    })

    const findUserDeleted = await usersRepository.findByEmail(
      'johndoe@example.com',
    )

    expect(findUserDeleted).toBeNull()
  })

  it("should not be able to delete user that doesn't exist", async () => {
    await expect(
      sut.execute({
        userId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
