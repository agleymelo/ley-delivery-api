import fastify from 'fastify'

export const app = fastify()

app.get('/', (request, reply) => {
  return reply.status(200).send({ hello: 'world' })
})
