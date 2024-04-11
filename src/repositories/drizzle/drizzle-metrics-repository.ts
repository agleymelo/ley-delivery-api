import { and, count, desc, eq, gte, lte, sql, sum } from 'drizzle-orm'
import { db } from '../../database/connection'
import { orderItems, orders, products } from '../../database/schema'
import type {
  GetDayOrdersAmountReply,
  GetMonthRevenueReply,
  GetOrdersPerMonthReply,
  GetPopularProductsReply,
  MetricsRepository,
  ReceiptPeriodInPeriodReply,
} from '../repository/metrics-repository'

export class DrizzleMetricsRepository implements MetricsRepository {
  async getMonthRevenue(
    startOfLastMonth: Date,
  ): Promise<GetMonthRevenueReply[]> {
    const receipts = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.created_at}, 'YYYY-MM')`,
        receipt: sum(orders.totalInCents).mapWith(Number),
      })
      .from(orders)
      .where(gte(orders.created_at, startOfLastMonth))
      .groupBy(sql`TO_CHAR(${orders.created_at}, 'YYYY-MM')`)

    return receipts
  }

  async getDayOrdersAmount(
    startOfYesterday: Date,
  ): Promise<GetDayOrdersAmountReply[]> {
    const orderPerDay = await db
      .select({
        dayWithMonthAndYear: sql<string>`TO_CHAR(${orders.created_at}, 'YYYY-MM-DD')`,
        amount: count(),
      })
      .from(orders)
      .where(gte(orders.created_at, startOfYesterday))
      .groupBy(sql`TO_CHAR(${orders.created_at}, 'YYYY-MM-DD')`)

    return orderPerDay
  }

  async getOrdersPerMonth(
    startOfLastMonth: Date,
  ): Promise<GetOrdersPerMonthReply[]> {
    const ordersPerMonth = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.created_at}, 'YYYY-MM')`,
        amount: count(),
      })
      .from(orders)
      .where(gte(orders.created_at, startOfLastMonth))
      .groupBy(sql`TO_CHAR(${orders.created_at}, 'YYYY-MM')`)

    return ordersPerMonth
  }

  async getCanceledMonthOrders(
    startOfLastMonth: Date,
  ): Promise<GetOrdersPerMonthReply[]> {
    const ordersPerMonth = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.created_at}, 'YYYY-MM')`,
        amount: count(),
      })
      .from(orders)
      .where(
        and(
          eq(orders.status, 'cancelled'),
          gte(orders.created_at, startOfLastMonth),
        ),
      )
      .groupBy(sql`TO_CHAR(${orders.created_at}, 'YYYY-MM')`)

    return ordersPerMonth
  }

  async getPopularProducts(): Promise<GetPopularProductsReply[]> {
    const popularProducts = await db
      .select({
        product: products.name,
        amount: sum(orderItems.quantity).mapWith(Number),
      })
      .from(orderItems)
      .leftJoin(orders, eq(orders.id, orderItems.orderId))
      .leftJoin(products, eq(products.id, orderItems.productId))
      .groupBy(products.name)
      .orderBy((fields) => {
        return desc(fields.amount)
      })
      .limit(5)

    return popularProducts
  }

  async getDailyReceiptInPeriod(
    startDate: Date,
    endDate: Date,
  ): Promise<ReceiptPeriodInPeriodReply[]> {
    const dailyReceiptInPeriod = await db
      .select({
        date: sql<string>`TO_CHAR(${orders.created_at}, 'DD/MM')`,
        receipt: sum(orders.totalInCents).mapWith(Number),
      })
      .from(orders)
      .where(
        and(gte(orders.created_at, startDate), lte(orders.created_at, endDate)),
      )
      .groupBy(sql`TO_CHAR(${orders.created_at}, 'DD/MM')`)

    const orderedReceiptPerDay = dailyReceiptInPeriod.sort((a, b) => {
      const [dayA, monthA] = a.date.split('/').map(Number)
      const [dayB, monthB] = b.date.split('/').map(Number)

      if (monthA === monthB) {
        return dayA - dayB
      } else {
        const dateA = new Date(2024, monthA - 1)
        const dateB = new Date(2024, monthB - 1)

        return dateA.getTime() - dateB.getTime()
      }
    })

    return orderedReceiptPerDay
  }
}
