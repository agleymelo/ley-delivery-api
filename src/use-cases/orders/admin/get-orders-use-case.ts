import type { OrdersRepository } from '../../../repositories/repository/orders-repository'

type GetOrdersUseCaseRequest = {
  customerName: string
  orderId: string
  pageIndex: number
  status:
    | 'pending'
    | 'processing'
    | 'delivering'
    | 'delivered'
    | 'cancelled'
    | ''
}

export class GetOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    customerName,
    orderId,
    status,
    pageIndex,
  }: GetOrdersUseCaseRequest) {
    const results = await this.ordersRepository.findAllOrders(
      customerName,
      orderId,
      status,
      pageIndex,
    )

    return { results }
  }
}
