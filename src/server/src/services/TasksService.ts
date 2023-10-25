import { ITask } from '@src/models/Task';
import TaskRepo from '@src/repos/TaskRepo';

const addTask = async (task: ITask) => {
  await TaskRepo.add(task);
};

export default { addTask } as const;
