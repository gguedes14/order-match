import { Router } from 'express';

import { AuthController } from '../../controller/login/authController';

const authRouter = Router();

authRouter.post('/login', AuthController.authenticate);

export { authRouter };
