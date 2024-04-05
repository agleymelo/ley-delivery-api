import { eq } from 'drizzle-orm'

import { db } from '../../database/connection'
import { users } from '../../database/schema'
import type { CreateUserInput } from '../../dtos/users/create-user-input'
import type { User } from '../../dtos/users/user'

import type { UsersRepository } from '../repository/users-repository'

export class DrizzleUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id))

    if (!user) {
      return null
    }

    return user as User
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
      return null
    }

    return user as User
  }

  async create(data: CreateUserInput): Promise<User> {
    const [user] = await db.insert(users).values(data)

    return user
  }

  async save(user: User): Promise<User> {
    const [userUpdated] = await db
      .update(users)
      .set(user)
      .where(eq(users.id, user.id))
      .returning()

    return userUpdated as User
  }

  async delete(userId: string): Promise<void> {
    await db.delete(users).where(eq(users.id, userId))
  }
}
