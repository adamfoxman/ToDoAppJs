import { Priority } from '@src/enums/enums';

export type AddOrUpdateTaskDto = {
  title: string;
  description: string;
  dueDate?: Date;
  priority: Priority;
};
