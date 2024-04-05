import { DrizzleUsersRepository } from '../../../repositories/drizzle/drizzle-users-repository'
import { CreateUserUseCase } from '../create-user-use-case'

export function makeCreateUserUseCase() {
  const repository = new DrizzleUsersRepository()

  const useCase = new CreateUserUseCase(repository)

  return useCase
}
