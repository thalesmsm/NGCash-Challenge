import express from 'express';
import authorized from './middlewares/authorized';
import errorMiddleware from './middlewares/errorMiddleware';
import accountRouter from './routes/Account.router';
import loginRouter from './routes/Login.router';
import transactionRouter from './routes/Transaction.router';
import userRouter from './routes/User.router';

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', userRouter);
app.use('/users', userRouter);
app.use('/account', authorized, accountRouter);
app.use('/transaction', authorized, transactionRouter);

app.use(errorMiddleware);

export default app;
