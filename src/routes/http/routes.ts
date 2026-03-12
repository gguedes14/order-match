import { Router } from 'express';
import { usersRouter } from '../routes/usersRoutes';

const routes = Router();

routes.use('/users', usersRouter);

export { routes };
