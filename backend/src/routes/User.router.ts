import { Router } from 'express';
import UserController from '../controllers/User.controller';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getAllUsers);

export default userRouter;
