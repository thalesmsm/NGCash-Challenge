import { Router } from 'express';
import TransactionController from '../controllers/Transaction.controller';


const transactionController = new TransactionController();

const transactionRouter = Router();

transactionRouter.post('/', transactionController.create);

export default transactionRouter;
