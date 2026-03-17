import { Request, Response } from "express";
import { TradesService } from "../../service/orders/tradesService";
import { AppError } from '../../errors/apiError';

export class TradesController {
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
