import type { FastifyInstance } from "fastify";
import { getDayOrdersAmount } from "./get-day-orders-amount";
import { getMonthOrdersAmount } from "./get-month-orders-amount";
import { getMonthRevenue } from "./get-month-revenue";
import { getMonthCancelledOrdersAmount } from "./get-cancelled-month-orders-amount";
import { getPopularProducts } from "./get-popular-products";
import { getDailyReceiptInPeriod } from "./get-daily-receipt-in-period";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function metricsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.addHook("onRequest", verifyUserRole("admin"));

  app.get("/month-revenue", getMonthRevenue);
  app.get("/day-orders-amount", getDayOrdersAmount);
  app.get("/month-orders-amount", getMonthOrdersAmount);
  app.get("/month-cancelled-orders-amount", getMonthCancelledOrdersAmount);
  app.get("/popular-products", getPopularProducts);
  app.get("/daily-revenue-in-period", getDailyReceiptInPeriod);
}
