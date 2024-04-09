import { eq } from 'drizzle-orm'
import { db } from '../../database/connection'
import { orders } from '../../database/schema'
import type { Order } from '../../dtos/orders/order'
import type { OrdersRepository } from '../repository/orders-repository'

export class DrizzleOrdersRepository implements OrdersRepository {
  async findOneOrderByUserId(orderId: string, userId: string) {
    const order = await db.query.orders.findFirst({
      columns: {
        id: true,
        status: true,
        totalInCents: true,
        created_at: true,
      },
      with: {
        customer: {
          columns: {
            name: true,
            email: true,
            phone: true,
          },
        },
        orderItems: {
          columns: {
            id: true,
            priceInCents: true,
            quantity: true,
          },
          with: {
            product: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
      where(fields, { and, eq }) {
        return and(eq(fields.id, orderId), eq(fields.customerId, userId))
      },
    })

    return order as Order
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await db.query.orders.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, orderId)
      },
    })

    return order as Order
  }

  async updateStatus(
    orderId: string,
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'cancelled',
  ) {
    await db.update(orders).set({ status }).where(eq(orders.id, orderId))
  }
}
