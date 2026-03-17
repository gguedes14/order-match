import { TradesRepository } from "../../repository/orders/tradesRepository";

export class TradesService {
  static async getLatestTrade() {
    const trades = await TradesRepository.getLatestTrades();

    return trades.map(trade => ({
      price: Number(trade.price),
      volume: Number(trade.amount)
    }));
  }
}
