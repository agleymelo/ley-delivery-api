import type { Order } from '../../dtos/orders/order'

export interface OrdersRepository {
  findOneOrderByUserId: (
    orderId: string,
    userId: string,
  ) => Promise<{
    order: Pick<Order, 'id' | 'status' | 'totalInCents' | 'created_at'>
    customer: {
      name: string | undefined
      email: string | undefined
      phone: string | null | undefined
    }
    orderItems:
      | [
          {
            id: string
            priceInCents: number
            quantity: number
            product: {
              name: string
            }
          },
        ]
      | undefined
  }>
  findById(orderId: string): Promise<Order | null>
  updateStatus(
    orderId: string,
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'cancelled',
  ): Promise<void>
  findAllOrders(
    customerName: string,
    orderId: string,
    status:
      | 'pending'
      | 'processing'
      | 'delivering'
      | 'delivered'
      | 'cancelled'
      | undefined
      | '',
    pageIndex: number,
  ): Promise<{
    orders: Order[]
    meta: {
      pageIndex: number
      perPage: number
      total: number
    }
  } | null>
  findAllOrdersByUserId(
    userId: string,

    status:
      | 'pending'
      | 'processing'
      | 'delivering'
      | 'delivered'
      | 'cancelled'
      | undefined
      | '',
    pageIndex: number,
  ): Promise<{
    orders: Order[]
    meta: {
      pageIndex: number
      perPage: number
      total: number
    }
  }>
}
