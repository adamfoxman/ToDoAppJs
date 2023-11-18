import { Router } from 'express';
import jetValidator from 'jet-validator';

import adminMw from './middleware/adminMw';
import Paths from '../constants/Paths';
import User from '@src/models/User';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import TaskRoutes from './TaskRoutes';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// **** Setup AuthRouter **** //

const authRouter = Router();

// Login user
authRouter.post(
  Paths.Auth.Login,
  validate('email', 'password'),
  AuthRoutes.login,
);

// Logout user
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);

// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);

// Add one user
userRouter.post(
  Paths.Users.Add,
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, adminMw, userRouter);

// **** Setup TaskRouter **** //
const taskRouter = Router();

taskRouter.get(Paths.Tasks.Get, TaskRoutes.getAll);

/**
 * @swagger
 * /api/tasks/add:
 *  post:
 *    summary: Add a task.
 *    description: Add a task.
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task title.
 *                 example: Make a coffee.
 */
taskRouter.post(Paths.Tasks.Add, validate(['title']), TaskRoutes.add);

// Add TaskRouter
apiRouter.use(Paths.Tasks.Base, taskRouter);

// **** Export default **** //

export default apiRouter;
