import type { UsersRepository } from '../../repositories/repository/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type DeleteUserUseCaseRequest = {
  userId: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await this.usersRepository.delete(userId)
  }
}
