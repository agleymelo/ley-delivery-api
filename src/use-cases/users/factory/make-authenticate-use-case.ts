import { DrizzleUsersRepository } from '../../../repositories/drizzle/drizzle-users-repository'
import { AuthenticateUseCase } from '../authenticate-use-case'

export function makeAuthenticateUseUseCase() {
  const repository = new DrizzleUsersRepository()

  const useCase = new AuthenticateUseCase(repository)

  return useCase
}
