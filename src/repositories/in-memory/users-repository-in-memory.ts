import { createId } from '@paralleldrive/cuid2'

import type { CreateUserInput } from '../../dtos/users/create-user-input'
import type { User } from '../../dtos/users/user'

import type { UsersRepository } from '../repository/users-repository'

export class UsersRepositoryInMemory implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: CreateUserInput): Promise<User> {
    const user: User = {
      id: createId(),
      name: data.name,
      email: data.email,
      role: 'admin',
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async save(user: User): Promise<User> {
    const userIndex = this.items.findIndex((item) => item.id === user.id)

    return (this.items[userIndex] = user)
  }

  async delete(userId: string): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === userId)

    this.items.splice(userIndex, 1)
  }
}
