import { Prisma, OrderStatus, OrderType } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { MatchingRepository } from "../../repository/orders/matchingRepository";

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
        matchedOrder = await MatchingRepository.findBestSellMatch(tx, order.price);
      }

      if (order.type === OrderType.SELL) {
        matchedOrder = await MatchingRepository.findBestBuyMatch(tx, order.price);
      }

      if (!matchedOrder) {
        return;
      }

      const matchedAmount = Math.min(
        Number(order.remaining),
        Number(matchedOrder.remaining)
      );

      const tradePrice = matchedOrder.price;

      await MatchingRepository.createTrade(tx, {
        price: tradePrice,
        amount: new Prisma.Decimal(matchedAmount),
        buyOrderId: order.type === OrderType.BUY ? order.id : matchedOrder.id,
        sellOrderId: order.type === OrderType.SELL ? order.id : matchedOrder.id,
      });

      const orderRemaining = Number(order.remaining) - matchedAmount;
      const matchedOrderRemaining = Number(matchedOrder.remaining) - matchedAmount;

      await MatchingRepository.updateOrderAfterMatch(
        tx,
        order.id,
        new Prisma.Decimal(orderRemaining),
        orderRemaining === 0 ? OrderStatus.FILLED : OrderStatus.PARTIAL
      );

      await MatchingRepository.updateOrderAfterMatch(
        tx,
        matchedOrder.id,
        new Prisma.Decimal(matchedOrderRemaining),
        matchedOrderRemaining === 0 ? OrderStatus.FILLED : OrderStatus.PARTIAL
      );
    });
  }
}
