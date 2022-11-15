import express, { Request, Response } from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import loginRouter from './routes/Login.router';

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use(errorMiddleware);

export default app;
