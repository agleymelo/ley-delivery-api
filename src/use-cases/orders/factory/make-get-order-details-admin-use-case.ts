import { DrizzleOrdersRepository } from "../../../repositories/drizzle/drizzle-orders-repository";
import { GetOrderDetailsAdminUseCas } from "../admin/get-order-details-admin-use-case";

export function makeGetOrderDetailsAdminUseCas() {
  const repository = new DrizzleOrdersRepository();

  const useCase = new GetOrderDetailsAdminUseCas(repository);

  return useCase;
}
