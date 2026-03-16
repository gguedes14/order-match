import { Router } from 'express';

import { StatsController } from '../../controller/orders/statsController';
import { JwtAuthenticate } from '../../middleware/jwt';

const ordersRouter = Router();

ordersRouter.get('/stats', JwtAuthenticate, StatsController.getStats);

export { ordersRouter };
