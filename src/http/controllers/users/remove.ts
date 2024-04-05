import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeleteUserUseCase } from '../../../use-cases/users/factory/make-delete-user-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeUserParamsSchema = z.object({
    userId: z.string(),
  })

  const { userId } = removeUserParamsSchema.parse(request.params)

  try {
    const deleteUserUseCas = makeDeleteUserUseCase()

    await deleteUserUseCas.execute({
      userId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
