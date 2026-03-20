import { Router } from 'express';

import { JwtAuthenticate } from '../../middleware/jwt';
import { TradesController } from '../../controller/orders/tradesController';
import { OrdersController } from '../../controller/orders/ordersController';

const ordersRouter = Router();

ordersRouter.get('/stats', JwtAuthenticate, TradesController.getStats);
ordersRouter.get('/trades', JwtAuthenticate, TradesController.getLatestTrade);
ordersRouter.post('/trades', JwtAuthenticate, OrdersController.createOrders);
ordersRouter.get('/active', JwtAuthenticate, OrdersController.getActiveOrders);
ordersRouter.patch('/cancel/:id', JwtAuthenticate, OrdersController.cancelOrder);

export { ordersRouter };
