import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '../../../use-cases/errors/user-already-exists-error'
import { makeAuthenticateUseUseCase } from '../../../use-cases/users/factory/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = createUserBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeAuthenticateUseUseCase()

    const { user } = await createUserUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '1d',
        },
      },
    )

    return reply
      .status(200)
      .send({ user: { ...user, password_hash: null }, token })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
