import { describe, beforeEach, it, expect } from 'vitest'

import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UpdateUserProfileUseCase } from './update-user-profile-use-case'
import { compare, hash } from 'bcrypt'
import { OldPasswordIsRequiredError } from '../errors/old-password-is-required-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserProfileUseCase

describe('Update User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserProfileUseCase(usersRepository)
  })

  it('should to be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be able to update user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
      name: 'John Updated',
      email: 'johndoe@example.com',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Updated')
    expect(user.email).toEqual('johndoe@example.com')
  })

  it('should be able to change password', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 8),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
      name: 'John Updated',
      email: 'johndoe@example.com',
      oldPassword: '123456',
      password: '000000',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Updated')
    expect(await compare('000000', user.password_hash)).toBeTruthy()
  })

  it('should not be able to update the profile of a non-existent user', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existent-user-id',
        name: 'John Updated',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to change the password if the old passowrd is not entered', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 8),
    })

    await expect(() =>
      sut.execute({
        userId: createdUser.id,
        name: 'John Updated',
        email: 'johndoe@example.com',
        password: '000123',
      }),
    ).rejects.toBeInstanceOf(OldPasswordIsRequiredError)
  })

  it('should not be able to change the password if the old password is incorrect', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 8),
    })

    await expect(() =>
      sut.execute({
        userId: createdUser.id,
        email: 'johndoe@example.com',
        oldPassword: '0000000',
        password: '000123',
      }),
    ).rejects.toBeInstanceOf(OldPasswordIsRequiredError)
  })

  it('should not be ablt to change the email to an email that is already in use', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 8),
    })

    const createUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 8),
    })

    await expect(() =>
      sut.execute({
        userId: createUser.id,
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
