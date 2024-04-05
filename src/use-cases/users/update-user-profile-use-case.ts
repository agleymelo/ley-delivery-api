import { compare, hash } from 'bcrypt'

import type { UsersRepository } from '../../repositories/repository/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { OldPasswordIsRequiredError } from '../errors/old-password-is-required-error'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

type UpdateUserProfileUseCaseRequest = {
  userId: string
  name?: string
  email: string
  phone?: string
  oldPassword?: string
  password?: string
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
    phone,
    oldPassword,
    password,
  }: UpdateUserProfileUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail && userWithSameEmail.id !== user.id) {
      throw new UserAlreadyExistsError()
    }

    user.name = name ?? user.name
    user.phone = phone ?? user.phone
    user.email = email ?? user.email

    if (password && !oldPassword) {
      throw new OldPasswordIsRequiredError()
    }

    if (password && oldPassword) {
      const isPasswordMatched = await compare(oldPassword, user.password_hash)

      if (!isPasswordMatched) {
        throw new OldPasswordIsRequiredError()
      }

      const newHashedPassword = await hash(password, 8)

      user.password_hash = newHashedPassword

      await this.usersRepository.save(user)
    }

    await this.usersRepository.save(user)

    return { user }
  }
}
