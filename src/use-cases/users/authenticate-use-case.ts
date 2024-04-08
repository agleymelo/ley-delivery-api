import { compare } from 'bcrypt'
import type { UsersRepository } from '../../repositories/repository/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-erros'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordMatched = await compare(password, user.password_hash)

    if (!isPasswordMatched) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
