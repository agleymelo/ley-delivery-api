import type { OrdersRepository } from '../../../repositories/repository/orders-repository'
import type { ProductsRepository } from '../../../repositories/repository/products-repository'
import { ProductPriceDoestNotMatchError } from '../../errors/product-price-does-not-match-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type OrderItems = {
  id: string
  totalInCents: number
  quantity: number
}

type CreateOderUserUseCaseResponse = {
  userId: string
  totalInCents: number
  orderItems: OrderItems[]
}

export class CreateOrderUserUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    userId,
    orderItems,
    totalInCents,
  }: CreateOderUserUseCaseResponse) {
    for (const orderItem of orderItems) {
      const product = await this.productsRepository.findProductById(
        orderItem.id,
      )

      if (!product) {
        throw new ResourceNotFoundError()
      }

      if (product.priceInCents !== orderItem.totalInCents) {
        throw new ProductPriceDoestNotMatchError()
      }
    }

    const order = await this.ordersRepository.createOrder(
      userId,
      totalInCents,
      orderItems,
    )

    return order
  }
}
