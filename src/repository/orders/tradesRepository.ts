import { prisma } from "../../database/prisma";

export class TradesRepository {
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
