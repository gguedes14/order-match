import { Prisma, PrismaClient, OrderStatus, OrderType } from "@prisma/client";

type TransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export class MatchingRepository {
  static async findOrderById(tx: TransactionClient, orderId: string) {
    return tx.order.findUnique({
      where: {
        id: orderId,
      }
    });
  }

  static async findBestSellMatch(tx: TransactionClient, price: Prisma.Decimal) {
    return tx.order.findFirst({
      where: {
        type: OrderType.SELL,
        status: {
          in: [OrderStatus.OPEN, OrderStatus.PARTIAL],
        },
        price: {
          lte: price,
        },
      },
      orderBy: [
        {
          price: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });
  }

  static async findBestBuyMatch(
    tx: TransactionClient,
    price: Prisma.Decimal
  ) {
    return tx.order.findFirst({
      where: {
        type: OrderType.BUY,
        status: {
          in: [OrderStatus.OPEN, OrderStatus.PARTIAL],
        },
        price: {
          gte: price,
        },
      },
      orderBy: [
        {
          price: "desc",
        },
        {
          createdAt: "asc",
        },
      ],
    });
  }

  static async createTrade(
    tx: TransactionClient,
    data: {
      price: Prisma.Decimal;
      amount: Prisma.Decimal;
      buyOrderId: string;
      sellOrderId: string;
    }
  ) {
    return tx.trade.create({
      data,
    });
  }

  static async updateOrderAfterMatch(
    tx: TransactionClient,
    orderId: string,
    remaining: Prisma.Decimal,
    status: OrderStatus
  ) {
    return tx.order.update({
      where: {
        id: orderId,
      },
      data: {
        remaining,
        status,
      },
    });
  }
}
