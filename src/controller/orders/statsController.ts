import { Response } from "express";
import { StatsService } from "../../service/orders/statsService";
import { AuthRequest } from "../../types/authRequest";
import { AppError } from '../../errors/apiError';

export class StatsController {
  static async getStats(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    try {
      const stats = await StatsService.getStats(userId);

      return res.status(200).json(stats);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }
    }
  }
}
