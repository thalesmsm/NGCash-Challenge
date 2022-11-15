import { Router } from 'express';
import AccountController from '../controllers/Account.controller';

const accountController = new AccountController();
const accountRouter = Router();

accountRouter.get('/:id', accountController.getAccount);

export default accountRouter;