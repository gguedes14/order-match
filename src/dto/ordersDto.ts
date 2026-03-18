import { OrderType } from "@prisma/client";

export interface CreateOrderDTO {
  userId: string;
  type: OrderType;
  amount: number;
  price: number;
}
