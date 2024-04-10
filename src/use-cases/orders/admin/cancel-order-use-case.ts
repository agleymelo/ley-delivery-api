import type { OrdersRepository } from '../../../repositories/repository/orders-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { YouCannotCancelOrdersAfterDispatchError } from '../../errors/you-cannot-cancel-orders-after-dispatch-error'

type CancelOrderUseCaseRequest = {
  orderId: string
}

export class CancelOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ orderId }: CancelOrderUseCaseRequest) {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    if (!['pending', 'processing'].includes(order.status)) {
      throw new YouCannotCancelOrdersAfterDispatchError()
    }

    await this.ordersRepository.updateStatus(orderId, 'cancelled')
  }
}
