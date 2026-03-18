import { prisma } from "../../database/prisma";

export class TradesRepository {
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

  static async getLatestTrades() {
    return prisma.trade.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
      select: {
        price: true,
        amount: true
      }
    });
  }
}
