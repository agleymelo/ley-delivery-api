import type { OrdersRepository } from '../../../repositories/repository/orders-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { YouCannotDeliverOrdersInDispatchStatusError } from '../../errors/you-cannot-deliver-orders-in-dispatch-status-error'

type DispatchOrderUseCaseRequest = {
  orderId: string
}

export class DispatchOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ orderId }: DispatchOrderUseCaseRequest) {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    if (order.status !== 'processing') {
      throw new YouCannotDeliverOrdersInDispatchStatusError()
    }

    await this.ordersRepository.updateStatus(orderId, 'delivering')
  }
}
