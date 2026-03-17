import { Router } from 'express';

import { StatsController } from '../../controller/orders/statsController';
import { JwtAuthenticate } from '../../middleware/jwt';
import { TradesController } from '../../controller/orders/tradesController';

const ordersRouter = Router();

ordersRouter.get('/stats', JwtAuthenticate, StatsController.getStats);
ordersRouter.get('/trades', JwtAuthenticate, TradesController.getLatestTrade);

export { ordersRouter };
