import { Router } from 'express';
import TransactionController from '../controllers/Transaction.controller';

const transactionController = new TransactionController();

const transactionRouter = Router();

transactionRouter.post('/', transactionController.create);
transactionRouter.get('/all/:id', transactionController.getTransactions);
transactionRouter.get('/out/:id', transactionController.getCashOutTransactions);
transactionRouter.get('/in/:id', transactionController.getCashInTransactions);

export default transactionRouter;
