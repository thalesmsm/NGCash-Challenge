import express, { Request, Response } from 'express';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  return res.status(200).send('Express + TypeScript Test');
});

app.use(errorMiddleware);

export default app;
