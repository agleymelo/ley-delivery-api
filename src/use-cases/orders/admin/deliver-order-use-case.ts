import type { OrdersRepository } from '../../../repositories/repository/orders-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { YouCannotDeliverOrdersInDeliveringStatusError } from '../../errors/you-cannot-deliver-orders-in-delivering-status-error'

type DeliverOrderUseCaseRequest = {
  orderId: string
}

export class DeliverOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ orderId }: DeliverOrderUseCaseRequest) {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    if (order.status !== 'delivering') {
      throw new YouCannotDeliverOrdersInDeliveringStatusError()
    }

    await this.ordersRepository.updateStatus(orderId, 'delivered')
  }
}
