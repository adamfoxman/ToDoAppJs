import { AddOrUpdateTaskDto } from '@src/dtos/TasksDtos';
import { IReq, IRes } from './types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import TasksService from '@src/services/TasksService';

/**
 * Create task
 */
const add = async (req: IReq<{ task: AddOrUpdateTaskDto }>, res: IRes) => {
  await TasksService.addTask({ ...req.body.task, id: 0 });
  return res.status(HttpStatusCodes.CREATED).json({ taskId: 1 });
};

export default {
  add,
} as const;
