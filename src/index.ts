import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from './routes/http/routes';
import { AppError } from './errors/apiError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.info('Server started on port 3000 🚀');
});
