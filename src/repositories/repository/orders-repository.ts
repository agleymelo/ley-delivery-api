import type { Order } from '../../dtos/orders/order'

export interface OrdersRepository {
  findOneOrderByUserId: (
    orderId: string,
    userId: string,
  ) => Promise<Order | null>
  findById(orderId: string): Promise<Order | null>
  updateStatus(
    orderId: string,
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'cancelled',
  ): Promise<void>
}
