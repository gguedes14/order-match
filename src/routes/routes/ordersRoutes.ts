import { Router } from 'express';

import { StatsController } from '../../controller/orders/statsController';
import { JwtAuthenticate } from '../../middleware/jwt';
import { TradesController } from '../../controller/orders/tradesController';
import { OrdersController } from '../../controller/orders/ordersController';

const ordersRouter = Router();

ordersRouter.get('/stats', JwtAuthenticate, StatsController.getStats);
ordersRouter.get('/trades', JwtAuthenticate, TradesController.getLatestTrade);
ordersRouter.post('/trades', JwtAuthenticate, OrdersController.createOrders);

export { ordersRouter };
