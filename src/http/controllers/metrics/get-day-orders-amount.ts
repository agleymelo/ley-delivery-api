import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetDayOrdersAmountUseCase } from "../../../use-cases/metrics/factory/make-get-day-orders-amount-use-case";

export async function getDayOrdersAmount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getDayOrdersAmountUseCase = makeGetDayOrdersAmountUseCase();

    const { amount, diffFromYesterday } =
      await getDayOrdersAmountUseCase.execute();

    return reply.status(200).send({ amount, diffFromYesterday });
  } catch (err) {
    console.log(err);
  }
}
