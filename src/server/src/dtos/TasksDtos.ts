import { Priority } from '@src/enums/enums';

export type AddOrUpdateTaskDto = {
  owner: string;
  title: string;
  description?: string;
  done: boolean;
  dueDate?: Date;
  priority: Priority;
};
