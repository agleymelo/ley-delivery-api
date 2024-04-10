import type { OrdersRepository } from '../../../repositories/repository/orders-repository'

type GetAllOrdersUserUseCaseRequest = {
  userId: string
  pageIndex: number
  status:
    | 'pending'
    | 'processing'
    | 'delivering'
    | 'delivered'
    | 'cancelled'
    | ''
}

export class GetAllOrdersUserUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ userId, status, pageIndex }: GetAllOrdersUserUseCaseRequest) {
    const results = await this.ordersRepository.findAllOrdersByUserId(
      userId,
      status,
      pageIndex,
    )

    return {
      orders: results.orders,
      meta: results.meta,
    }
  }
}
