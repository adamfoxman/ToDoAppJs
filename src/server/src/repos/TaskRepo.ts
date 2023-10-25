import { ITask } from '@src/models/Task';

const add = async (task: ITask): Promise<number> => {
  return await new Promise((resolve) => {
    task.id = 1;
    resolve(1);
  });
};

export default {
  add,
} as const;
