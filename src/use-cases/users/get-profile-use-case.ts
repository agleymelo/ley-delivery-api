import type { UsersRepository } from '../../repositories/repository/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type GetProfileUseCaseRequest = {
  userId: string
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetProfileUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
