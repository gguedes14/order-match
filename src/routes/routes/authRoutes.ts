import { Router } from 'express';

import { AuthController } from '../../controller/authController';

const authRouter = Router();

authRouter.post('/login', AuthController.authenticate);

export { authRouter };
