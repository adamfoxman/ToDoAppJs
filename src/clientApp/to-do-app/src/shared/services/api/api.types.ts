import { Priority } from "shared/types/enums";

export interface CreateTodoPayload {
   title: string;
   description: string;
   dueDate?: Date;
   priority: Priority;
}

export interface RegisterPayload {
   email: string;
   name: string;
   login: string;
   password: string;
   surname: string;
}
