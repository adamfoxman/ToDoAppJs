import { Priority } from "shared/types/enums";

export interface CreateTodoPayload {
   title: string;
   description: string;
   dueDate?: Date;
   priority: Priority;
   owner: string;
   done: boolean;
}

export interface RegisterPayload {
   email: string;
   name: string;
   password: string;
}

export interface LoginPayload {
   email: string;
   password: string;
}

export interface Todo {
   _id: string;
   owner: string;
   title: string;
   description: string;
   done: false;
   dueDate?: string;
   priority: Priority;
}
