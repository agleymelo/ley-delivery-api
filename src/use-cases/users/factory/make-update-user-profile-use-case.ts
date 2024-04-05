import { DrizzleUsersRepository } from '../../../repositories/drizzle/drizzle-users-repository'
import { UpdateUserProfileUseCase } from '../update-user-profile-use-case'

export function makeUpdateUserProfileUseCase() {
  const repository = new DrizzleUsersRepository()

  const useCase = new UpdateUserProfileUseCase(repository)

  return useCase
}
