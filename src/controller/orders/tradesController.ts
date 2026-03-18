import { Request, Response } from "express";
import { TradesService } from "../../service/orders/tradesService";
import { AuthRequest } from "../../types/authRequest";
import { AppError } from '../../errors/apiError';

export class TradesController {
  static async getStats(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    try {
      const stats = await TradesService.getStats(userId);

      return res.status(200).json(stats);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }
    }
  }

  static async getLatestTrade(req: Request, res: Response) {
    try {
      const trades = await TradesService.getLatestTrade()

      return res.status(200).json(trades);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }
    }
  }
}
