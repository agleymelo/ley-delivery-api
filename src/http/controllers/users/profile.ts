import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetProfileUserUseCase } from '../../../use-cases/users/factory/make-get-profile-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileUserParamsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = profileUserParamsSchema.parse(request.params)

  try {
    const getProfileUserUseCase = makeGetProfileUserUseCase()

    const { user } = await getProfileUserUseCase.execute({
      userId,
    })

    return reply.status(200).send({ user: { ...user, password_hash: null } })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
