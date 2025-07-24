import express from 'express';
import * as UserController from '../../Controllers/User.js';

const userRouter = express.Router();

userRouter.route('/users')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

userRouter.route('/users/:id')
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

export default userRouter;
