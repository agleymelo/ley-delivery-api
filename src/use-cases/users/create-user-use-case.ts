import { hash } from 'bcrypt'

import type { UsersRepository } from '../../repositories/repository/users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

type CreateUserUseCaseRequest = {
  name: string
  email: string
  phone?: string
  password: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password, phone }: CreateUserUseCaseRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      password_hash: hashedPassword,
    })

    return { user }
  }
}
