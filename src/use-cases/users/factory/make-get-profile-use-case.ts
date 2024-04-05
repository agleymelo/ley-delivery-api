import { DrizzleUsersRepository } from '../../../repositories/drizzle/drizzle-users-repository'
import { GetProfileUseCase } from '../get-profile-use-case'

export function makeGetProfileUserUseCase() {
  const repository = new DrizzleUsersRepository()

  const useCase = new GetProfileUseCase(repository)

  return useCase
}
