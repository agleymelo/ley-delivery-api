import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseUseCase } from '../../../use-cases/users/factory/make-authenticate-use-case'
import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-erros'

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
      {
        role: user.role,
      },
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
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
