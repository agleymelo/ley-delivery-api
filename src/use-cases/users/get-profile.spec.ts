import { describe, beforeEach, it, expect } from 'vitest'

import { UsersRepositoryInMemory } from '../../repositories/in-memory/users-repository-in-memory'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

import { GetProfileUseCase } from './get-profile-use-case'

let usersRepository: UsersRepositoryInMemory
let sut: GetProfileUseCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    sut = new GetProfileUseCase(usersRepository)
  })

  it('should to be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be able to get profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual('johndoe@example.com')
  })

  it("should not be able to delete user that doesn't exist", async () => {
    await expect(
      sut.execute({
        userId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
