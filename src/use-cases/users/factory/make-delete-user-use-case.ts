import { DrizzleUsersRepository } from '../../../repositories/drizzle/drizzle-users-repository'
import { DeleteUserUseCase } from '../delete-user-use-case'

export function makeDeleteUserUseCase() {
  const repository = new DrizzleUsersRepository()

  const useCase = new DeleteUserUseCase(repository)

  return useCase
}
