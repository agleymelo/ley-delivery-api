import type { OrdersRepository } from '../../../repositories/repository/orders-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type GetOrderDetailsUserUseCaseRequest = {
  orderId: string
  userId: string
}

export class GetOrderDetailsUserUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ orderId, userId }: GetOrderDetailsUserUseCaseRequest) {
    const order = await this.ordersRepository.findOneOrderByUserId(
      orderId,
      userId,
    )

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return { order }
  }
}
