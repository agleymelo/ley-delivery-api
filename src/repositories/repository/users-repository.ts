import type { CreateUserInput } from '../../dtos/users/create-user-input'
import type { User } from '../../dtos/users/user'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUserInput): Promise<User>
  save(user: User): Promise<User>
  delete(userId: string): Promise<void>
}
