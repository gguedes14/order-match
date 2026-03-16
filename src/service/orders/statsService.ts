import { StatsRepository } from "../../repository/orders/statsRepository";
import { UsersRepository } from "../../repository/users/usersRepository";

export class StatsService {
  static async getStats(userId: string) {
    const lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [lastTrade, lastDayTrade, userBalance] = await Promise.all([
      StatsRepository.getLastTrade(),
      StatsRepository.getLastDayTrades(lastDay),
      UsersRepository.getUserBalance(userId),
    ]);

    const lastDayBtcTrade = lastDayTrade.reduce(
      (acc, trade) => acc + Number(trade.amount),
      0
    );

    const lastDayUsdTrade = lastDayTrade.reduce(
      (acc, trade) => acc + Number(trade.amount),
      0
    );

    const prices = lastDayTrade.map((trade) => Number(trade.price));

    const high24h = prices.length > 0 ? Math.max(...prices) : 0;
    const low24h = prices.length > 0 ? Math.min(...prices) : 0;

    return {
      lastPrice: lastTrade ? Number(lastTrade.price) : 0,
      lastDayBtcTrade,
      lastDayUsdTrade,
      high24h,
      low24h,
      userUsdBalance: userBalance ? Number(userBalance.usd) : 0,
      userBtcBalance: userBalance ? Number(userBalance.btc) : 0,
    }
  }
}
