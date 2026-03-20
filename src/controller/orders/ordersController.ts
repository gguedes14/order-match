import { Response } from "express";
import { AuthRequest } from "../../types/authRequest";
import { OrdersService } from "../../service/orders/ordersService";
import { AppError } from "../../errors/apiError";

export class OrdersController {
  static async createOrders(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { type, amount, price } = req.body;

    try {
      const order = await OrdersService.createOrder({
        userId,
        type,
        amount: Number(amount),
        price: Number(price),
      });

      return res.status(201).json(order);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }
    }
  }

  static async getActiveOrders(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    try {
      const activeOrder = await OrdersService.getActiveOrder(userId);

      return res.status(200).json(activeOrder);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }
    }
  }
}
