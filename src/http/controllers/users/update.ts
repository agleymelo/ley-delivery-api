import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '../../../use-cases/errors/user-already-exists-error'
import { makeUpdateUserProfileUseCase } from '../../../use-cases/users/factory/make-update-user-profile-use-case'
import { OldPasswordIsRequiredError } from '../../../use-cases/errors/old-password-is-required-error'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateUserParamsSchema = z.object({
    userId: z.string(),
  })

  const updateUserBodySchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email(),
    password: z.string().optional(),
    oldPassword: z.string().optional(),
  })

  const { userId } = updateUserParamsSchema.parse(request.params)
  const { name, email, phone, password, oldPassword } =
    updateUserBodySchema.parse(request.body)

  try {
    const updateUserProfileUseCase = makeUpdateUserProfileUseCase()

    await updateUserProfileUseCase.execute({
      userId,
      name,
      email,
      phone,
      password,
      oldPassword,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    } else if (err instanceof OldPasswordIsRequiredError) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
