import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import loginRouter from './routes/Login.router';
import userRouter from './routes/User.router';

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', userRouter);

app.use(errorMiddleware);

export default app;
