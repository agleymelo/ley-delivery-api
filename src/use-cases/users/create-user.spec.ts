import { describe, beforeEach, it, expect } from 'vitest'

import { UsersRepositoryInMemory } from '../../repositories/in-memory/users-repository-in-memory'
import { CreateUserUseCase } from './create-user-use-case'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let usersRepository: UsersRepositoryInMemory
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should to be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to create a user with the same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
