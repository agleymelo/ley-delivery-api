import { and, count, eq, getTableColumns, ilike } from 'drizzle-orm'

import { db } from '../../database/connection'
import { orders, users } from '../../database/schema'
import type { Order } from '../../dtos/orders/order'
import type { OrdersRepository } from '../repository/orders-repository'

export class DrizzleOrdersRepository implements OrdersRepository {
  async findOneOrderByUserId(
    orderId: string,
    userId: string,
  ): Promise<{
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
  }> {
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

    return {
      order: {
        id: order?.id ?? '',
        status: order?.status ?? 'pending',
        totalInCents: order?.totalInCents ?? 0,
        created_at: order?.created_at ?? new Date(),
      },
      customer: {
        name: order?.customer?.name,
        email: order?.customer?.email,
        phone: order?.customer?.phone,
      },
      orderItems: order?.orderItems.map((orderItem) => {
        return {
          id: orderItem.id,
          priceInCents: orderItem.priceInCents,
          quantity: orderItem.quantity,
          product: {
            name: orderItem.product?.name,
          },
        }
      }) as
        | [
            {
              id: string
              priceInCents: number
              quantity: number
              product: { name: string }
            },
          ]
        | undefined,
    }
  }

  async findAllOrdersByUserId(
    userId: string,
    status:
      | 'pending'
      | 'processing'
      | 'delivering'
      | 'delivered'
      | 'cancelled'
      | undefined,
    pageIndex: number,
  ): Promise<{
    orders: Order[]
    meta: {
      pageIndex: number
      perPage: number
      total: number
    }
  }> {
    const [[{ count: amountOfOrdersOfUser }], allOrderUsers] =
      await Promise.all([
        db
          .select({ count: count() })
          .from(orders)
          .where(eq(orders.customerId, userId)),
        db
          .select()
          .from(orders)
          .where(
            and(
              eq(orders.customerId, userId),
              status ? eq(orders.status, status) : undefined,
            ),
          )
          .offset(pageIndex * 10)
          .limit(10),
      ])

    return {
      orders: allOrderUsers,
      meta: {
        pageIndex,
        perPage: 10,
        total: amountOfOrdersOfUser,
      },
    }
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await db.query.orders.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, orderId)
      },
    })

    return order as Order
  }

  async findAllOrders(
    customerName: string,
    orderId: string,
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'cancelled',
    pageIndex: number,
  ): Promise<{
    orders: Order[]
    meta: {
      pageIndex: number
      perPage: number
      total: number
    }
  }> {
    const orderTableColumns = getTableColumns(orders)

    const baseQuery = db
      .select(orderTableColumns)
      .from(orders)
      .innerJoin(users, eq(users.id, orders.customerId))
      .where(
        and(
          orderId ? ilike(orders.id, `%${orderId}%`) : undefined,
          status ? eq(orders.status, status) : undefined,
          customerName ? ilike(users.name, `%${customerName}%`) : undefined,
        ),
      )

    const [amountOfOrdersQuery, results] = await Promise.all([
      db.select({ count: count() }).from(baseQuery.as('baseQuery')),
      db
        .select()
        .from(baseQuery.as('baseQuery'))
        .offset(pageIndex * 10)
        .limit(10),
    ])

    const { count: amountOfOrders } = amountOfOrdersQuery[0]

    return {
      orders: results,
      meta: {
        pageIndex,
        perPage: 10,
        total: amountOfOrders,
      },
    }
  }

  async updateStatus(
    orderId: string,
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'cancelled',
  ) {
    await db.update(orders).set({ status }).where(eq(orders.id, orderId))
  }
}
