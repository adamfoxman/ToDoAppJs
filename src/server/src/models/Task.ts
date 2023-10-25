import { Priority } from '@src/enums/enums';

export interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate?: Date;
  priority: Priority;
}
