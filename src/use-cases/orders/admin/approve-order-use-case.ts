import type { OrdersRepository } from '../../../repositories/repository/orders-repository'
import { OrderIsNotPendingError } from '../../errors/order-is-not-pending-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type ApproveOrderUseCaseRequest = {
  orderId: string
}

export class ApproveOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ orderId }: ApproveOrderUseCaseRequest) {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    if (order.status !== 'pending') {
      throw new OrderIsNotPendingError()
    }

    await this.ordersRepository.updateStatus(orderId, 'processing')
  }
}
