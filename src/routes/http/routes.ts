import { Router } from 'express';
import { usersRouter } from '../routes/usersRoutes';
import { authRouter } from '../routes/authRoutes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);

export { routes };
