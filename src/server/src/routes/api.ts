import { Router } from 'express';
import jetValidator from 'jet-validator';

import adminMw from './middleware/adminMw';
import Paths from '../constants/Paths';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import TaskRoutes from './TaskRoutes';

/**
 * Express router for the API endpoints.
 *
 * @remarks
 * This router handles authentication, user management, and task management.
 */
const apiRouter = Router(),
  validate = jetValidator();

// **** Setup AuthRouter **** //

const authRouter = Router();

/**
 * Login user.
 *
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user.
 *     description: Login user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Invalid email or password.
 */
authRouter.post(
  Paths.Auth.Login,
  validate('email', 'password'),
  AuthRoutes.login,
);

/**
 * Logout user.
 *
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user.
 *     description: Logout currently logged-in user.
 *     responses:
 *       200:
 *         description: User logged out successfully.
 */
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);

// ** Add UserRouter ** //

const userRouter = Router();

/**
 * Get all users.
 *
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users.
 *     description: Get all registered users.
 *     responses:
 *       200:
 *         description: List of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: User ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: User name.
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         description: User email.
 *                         example: john@example.com
 */
userRouter.get(Paths.Users.Get, UserRoutes.getAll);

/**
 * Add a user.
 *
 * @swagger
 * /api/users/add:
 *   post:
 *     summary: Add a user.
 *     description: Add a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User email.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: password123
 *               role:
 *                 type: string
 *                 description: User role.
 *                 example: STANDARD
 *     responses:
 *       201:
 *         description: User added successfully.
 *       400:
 *         description: Invalid user data.
 */
userRouter.post(Paths.Users.Add, UserRoutes.add);

/**
 * Update a user.
 *
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Update a user.
 *     description: Update an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: User ID.
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: User name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User email.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: password123
 *               role:
 *                 type: string
 *                 description: User role.
 *                 example: STANDARD
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Invalid user data.
 */
userRouter.put(Paths.Users.Update, UserRoutes.update);

/**
 * Delete a user.
 *
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Delete a user.
 *     description: Delete an existing user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID.
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Invalid user data.
 */
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'string', 'params']),
  UserRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, adminMw, userRouter);

// **** Setup TaskRouter **** //
const taskRouter = Router();

/**
 * Get all tasks.
 *
 * @swagger
 * /api/tasks/all:
 *   get:
 *     summary: Get all tasks.
 *     description: Get all tasks.
 *     responses:
 *       200:
 *         description: All tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: Task ID.
 *                         example: 1
 *                       owner:
 *                         type: string
 *                         description: Task owner.
 *                         example: 5f9a2b9a9d6b2b1b1c9d9c9d
 *                       title:
 *                         type: string
 *                         description: Task title.
 *                         example: Make a coffee.
 *                       description:
 *                         type: string
 *                         description: Task description.
 *                         example: Make a coffee with milk.
 *                       done:
 *                         type: boolean
 *                         description: Task done.
 *                         example: false
 *                       dueDate:
 *                         type: string
 *                         description: Task due date.
 *                         example: 2020-10-30T00:00:00.000Z
 *                       priority:
 *                         type: string
 *                         description: Task priority.
 *                         example: NONE
 */
taskRouter.get(Paths.Tasks.Get, TaskRoutes.getAll);

/**
 * Add a task.
 *
 * @swagger
 * /api/tasks/add:
 *   post:
 *     summary: Add a task.
 *     description: Add a new task.
 *     requestBody:
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
 *     responses:
 *       201:
 *         description: Task added successfully.
 *       400:
 *         description: Invalid task data.
 */
taskRouter.post(Paths.Tasks.Add, validate(['title']), TaskRoutes.add);

// Add TaskRouter
apiRouter.use(Paths.Tasks.Base, taskRouter);

// **** Export default **** //

export default apiRouter;
