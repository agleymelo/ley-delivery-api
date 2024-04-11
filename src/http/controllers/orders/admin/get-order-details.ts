import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "../../../../use-cases/errors/resource-not-found-error";
import { makeGetOrderDetailsAdminUseCas } from "../../../../use-cases/orders/factory/make-get-order-details-admin-use-case";

export async function getOrderDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const showOrderDetailsUserParamsSchema = z.object({
    orderId: z.string(),
  });

  const { orderId } = showOrderDetailsUserParamsSchema.parse(request.params);

  try {
    const getOrderDetailsAdminUseCas = makeGetOrderDetailsAdminUseCas();

    const { order } = await getOrderDetailsAdminUseCas.execute({
      orderId,
    });

    return reply.status(200).send({ order });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
  }
}
