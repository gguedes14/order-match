import { Router } from 'express';

import { UsersController } from '../../controller/users/usersController';

const usersRouter = Router();

usersRouter.post('/create', UsersController.createUser);

export { usersRouter };
