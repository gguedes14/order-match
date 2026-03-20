import { prisma } from "../../database/prisma";
import { OrderStatus, Prisma } from "@prisma/client";

export class OrdersRepository {
  static async createOrder(data: Prisma.OrderUncheckedCreateInput) {
    return prisma.order.create({
      data,
    });
  }

  static async findActiveOrdersByUserId(userId: string) {
    return prisma.order.findMany({
      where: {
        userId,
        status: {
          in: [OrderStatus.OPEN, OrderStatus.PARTIAL],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        amount: true,
        remaining: true,
        price: true,
        type: true,
        status: true,
        createdAt: true,
      },
    });
  }

  static async findOrderById(orderId: string) {
    return prisma.order.findUnique({
      where: {
        id: orderId,
      }
    });
  }

  static async cancelOrder(orderId: string) {
    return prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: OrderStatus.CANCELLED,
      },
    });
  }
}
