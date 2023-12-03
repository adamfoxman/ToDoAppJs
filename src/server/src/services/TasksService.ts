import { ITask } from '@src/models/Task';
import { ISessionUser } from '@src/models/User';
import TaskRepo from '@src/repos/TaskRepo';

async function getAll(user: ISessionUser | undefined): Promise<ITask[]> {
  return await TaskRepo.getAll(user);
}

const addOne = async (task: ITask) => {
  await TaskRepo.add(task);
};

async function updateOne(task: ITask) {
  const persists = await TaskRepo.persists(task._id);
  if (!persists) {
    throw new Error('Task not found');
  }
  
  await TaskRepo.update(task);
}

async function _delete(id: string) {
  const persists = await TaskRepo.persists(id);
  if (!persists) {
    throw new Error('Task not found');
  }
  
  await TaskRepo.delete(id);
  
}

export default {
  getAll,
  addTask: addOne,
  updateTask: updateOne,
  delete: _delete,
} as const;
