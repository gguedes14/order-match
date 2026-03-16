import { Router } from 'express';
import { usersRouter } from '../routes/usersRoutes';
import { authRouter } from '../routes/authRoutes';
import { ordersRouter } from '../routes/ordersRoutes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/orders', ordersRouter);

export { routes };
