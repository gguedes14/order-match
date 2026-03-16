import { prisma } from "../../database/prisma";

export class StatsRepository {
  static async getLastTrade() {
    return prisma.trade.findFirst({
      orderBy: {
        createdAt: "desc"
      },
      select: {
        price: true
      }
    });
  }

  static async getLastDayTrades(date: Date) {
    return prisma.trade.findMany({
      where: {
        createdAt: {
          gte: date
        }
      },
      select: {
        price: true,
        amount: true,
      }
    });
  }
}
