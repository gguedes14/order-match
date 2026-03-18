import { prisma } from "../../database/prisma";
import { Prisma } from "@prisma/client";

export class OrdersRepository {
  static async createOrder(data: Prisma.OrderUncheckedCreateInput) {
    return prisma.order.create({
      data,
    });
  }
}
