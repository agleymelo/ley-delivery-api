import { DrizzleOrdersRepository } from '../../../repositories/drizzle/drizzle-orders-repository'
import { ApproveOrderUseCase } from '../admin/approve-order-use-case'

export function makeApproveOrderUseCase() {
  const repository = new DrizzleOrdersRepository()

  const useCase = new ApproveOrderUseCase(repository)

  return useCase
}
