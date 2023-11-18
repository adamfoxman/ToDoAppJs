import { IReq, IRes } from './types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import TasksService from '@src/services/TasksService';
import { ITask } from '@src/models/Task';

/**
 * Create task
 */
// const add = async (req: IReq<{ task: ITask }>, res: IRes) => {
//   await TasksService.addTask(req.body.task);
//   return res.status(HttpStatusCodes.CREATED).json({ taskId: 1 });
// };

async function getAll(_: IReq, res: IRes) {
  const tasks = await TasksService.getAll();
  return res.status(HttpStatusCodes.OK).json({ tasks });
}

async function add(req: IReq<{ task: ITask }>, res: IRes) {
  const { task } = req.body;
  await TasksService.addTask(task);
  return res.status(HttpStatusCodes.CREATED).end();
}

export default {
  getAll,
  add,
} as const;
