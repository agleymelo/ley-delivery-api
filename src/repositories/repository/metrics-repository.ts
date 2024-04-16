export type GetMonthRevenueReply = {
  monthWithYear: string
  receipt: number
}

export type GetDayOrdersAmountReply = {
  dayWithMonthAndYear: string
  amount: number
}

export type GetOrdersPerMonthReply = {
  monthWithYear: string
  amount: number
}

export type GetPopularProductsReply = {
  product: string | null
  amount: number
}

export type ReceiptPeriodInPeriodReply = {
  date: string
  receipt: number
}

export interface MetricsRepository {
  getMonthRevenue(startOfLastMonth: Date): Promise<GetMonthRevenueReply[]>
  getDayOrdersAmount(startOfYesterday: Date): Promise<GetDayOrdersAmountReply[]>
  getOrdersPerMonth(startOfLastMonth: Date): Promise<GetOrdersPerMonthReply[]>
  getCanceledMonthOrders(
    startOfYesterday: Date,
  ): Promise<GetOrdersPerMonthReply[]>
  getPopularProducts(): Promise<GetPopularProductsReply[]>
  getDailyReceiptInPeriod(
    startDate: Date,
    endDate: Date,
  ): Promise<ReceiptPeriodInPeriodReply[]>
}
