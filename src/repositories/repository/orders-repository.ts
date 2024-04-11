import type { Order } from '../../dtos/orders/order'

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'delivering'
  | 'delivered'
  | 'cancelled'

export type OrderItems = {
  id: string
  priceInCents: number
  quantity: number
  product: {
    name: string
  }
}

export type FindOneOderByUserIdReply = {
  order: Pick<Order, 'id' | 'status' | 'totalInCents' | 'created_at'>
  customer: {
    name: string | undefined
    email: string | undefined
    phone: string | null | undefined
  }
  orderItems: OrderItems[] | undefined
}

export type FindAllOrdersReply = {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    total: number
  }
}

export interface OrdersRepository {
  findOneOrderByUserId: (
    orderId: string,
    userId: string,
  ) => Promise<FindOneOderByUserIdReply>
  findById(orderId: string): Promise<Order | null>

  findAllOrders(
    customerName: string,
    orderId: string,
    status: OrderStatus | undefined | '',
    pageIndex: number,
  ): Promise<FindAllOrdersReply | null>
  findAllOrdersByUserId(
    userId: string,
    status: OrderStatus | undefined | '',
    pageIndex: number,
  ): Promise<{
    orders: Order[]
    meta: {
      pageIndex: number
      perPage: number
      total: number
    }
  }>
  updateStatus(orderId: string, status: OrderStatus): Promise<void>
}
