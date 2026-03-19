import { Prisma, OrderStatus, OrderType } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { MatchingRepository } from "../../repository/orders/matchingRepository";
import { UsersRepository } from "../../repository/users/usersRepository";

export class MatchingService {
  static async executeMatching(orderId: string) {
    return prisma.$transaction(async (tx) => {
      const order = await MatchingRepository.findOrderById(tx, orderId);

      if (!order) {
        return;
      }

      if (order.status === OrderStatus.FILLED || order.status === OrderStatus.CANCELLED) {
        return;
      }

      let matchedOrder = null;

      if (order.type === OrderType.BUY) {
        matchedOrder = await MatchingRepository.findBestSellMatch(tx, order.price, order.id, order.userId);
      }

      if (order.type === OrderType.SELL) {
        matchedOrder = await MatchingRepository.findBestBuyMatch(tx, order.price, order.id, order.userId);
      }

      if (!matchedOrder) {
        return;
      }

      const matchedAmount = Math.min(
        Number(order.remaining),
        Number(matchedOrder.remaining)
      );

      const tradePrice = Number(matchedOrder.price);
      const total = matchedAmount * tradePrice;

      const buyUserId =
        order.type === OrderType.BUY ? order.userId : matchedOrder.userId;

      const sellUserId =
        order.type === OrderType.SELL ? order.userId : matchedOrder.userId;

      await MatchingRepository.createTrade(tx, {
        price: new Prisma.Decimal(tradePrice),
        amount: new Prisma.Decimal(matchedAmount),
        buyOrderId: order.type === OrderType.BUY ? order.id : matchedOrder.id,
        sellOrderId: order.type === OrderType.SELL ? order.id : matchedOrder.id,
      });

      await Promise.all([
        UsersRepository.updateUserBalance(tx, buyUserId, {
          usd: { decrement: new Prisma.Decimal(total) },
          btc: { increment: new Prisma.Decimal(matchedAmount) },
        }),
        UsersRepository.updateUserBalance(tx, sellUserId, {
          btc: { decrement: new Prisma.Decimal(matchedAmount) },
          usd: { increment: new Prisma.Decimal(total) },
        }),
      ]);

      const orderRemaining = Number(order.remaining) - matchedAmount;
      const matchedOrderRemaining = Number(matchedOrder.remaining) - matchedAmount;

      await Promise.all([
        MatchingRepository.updateOrderAfterMatch(
          tx,
          order.id,
          new Prisma.Decimal(orderRemaining),
          orderRemaining === 0 ? OrderStatus.FILLED : OrderStatus.PARTIAL
        ),
        MatchingRepository.updateOrderAfterMatch(
          tx,
          matchedOrder.id,
          new Prisma.Decimal(matchedOrderRemaining),
          matchedOrderRemaining === 0 ? OrderStatus.FILLED : OrderStatus.PARTIAL
        ),
      ]);
    });
  }
}
