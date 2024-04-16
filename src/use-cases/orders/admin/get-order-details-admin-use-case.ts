import type { OrdersRepository } from '../../../repositories/repository/orders-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type GetOrderDetailsAdminUseCasRequest = {
  orderId: string
}

export class GetOrderDetailsAdminUseCas {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ orderId }: GetOrderDetailsAdminUseCasRequest) {
    const order = await this.ordersRepository.findOrderDetailsUser(orderId)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return { order }
  }
}
