import { Prisma, OrderType, OrderStatus } from "@prisma/client";
import { AppError } from "../../errors/apiError";
import { OrdersRepository } from "../../repository/orders/orderRepository";
import { CreateOrderDTO } from "../../dto/ordersDto"
import { UsersRepository } from "../../repository/users/usersRepository";
import { MatchingService } from "./matchingService";

export class OrdersService {
  static async createOrder(data: CreateOrderDTO) {
    if (data.amount <= 0) {
      throw new AppError(400, "Amount must be greater than zero");
    }

    if (data.price <= 0) {
      throw new AppError(400, "Price must be greater than zero");
    }

    const user = await UsersRepository.getUserBalance(data.userId);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if (data.type === OrderType.BUY) {
      const total = data.amount * data.price;

      if (Number(user.usd) < total) {
        throw new AppError(400, "Insufficient USD balance");
      }
    }

    if (data.type === OrderType.SELL) {
      if (Number(user.btc) < data.amount) {
        throw new AppError(400, "Insufficient BTC balance");
      }
    }

    const order = await OrdersRepository.createOrder({
      userId: data.userId,
      type: data.type,
      amount: new Prisma.Decimal(data.amount),
      price: new Prisma.Decimal(data.price),
      remaining: new Prisma.Decimal(data.amount),
      status: OrderStatus.OPEN,
    });

    await MatchingService.executeMatching(order.id);

    return order;
  }

  static async getActiveOrder(userId: string) {
    const activeOrders = await OrdersRepository.findActiveOrdersByUserId(userId);

    return activeOrders;
  }

  static async cancelOrder(userId: string, orderId: string) {
    const findOrder = await OrdersRepository.findOrderById(orderId);

    if (!findOrder) {
      throw new AppError(404, "Order not found");
    }

    if (findOrder.userId !== userId) {
      throw new AppError(403, "Cannot cancel this order");
    }

    if (
      findOrder.status !== OrderStatus.OPEN &&
      findOrder.status !== OrderStatus.PARTIAL
    ) {
      throw new AppError(400, "Order cannot be cancelled");
    }

    const cancelOrder = await OrdersRepository.cancelOrder(orderId)

    return cancelOrder;
  }
}
