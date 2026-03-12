import { Router } from 'express';

import { UsersController } from '../../controller/usersController';

const usersRouter = Router();

usersRouter.post('/create', UsersController.createUser);

export { usersRouter };
