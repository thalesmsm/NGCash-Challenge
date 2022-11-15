import { Router } from 'express';
import UserController from '../controllers/User.controller';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', userController.createUser);

export default userRouter;
