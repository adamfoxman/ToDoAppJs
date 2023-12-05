import { JwtPayload } from "jwt-decode";
import { Priority } from "./enums";

//TODO change it
export interface tokenData extends JwtPayload {
   id: string;
   role: string;
   email: string;
   name: string;
}

export interface SignedIdUser {
   email: string;
   name: string;
   role: string;
   id: string;
}

export interface TodoListItem {
   id: string;
   title: string;
   description: string;
   dueDate?: Date;
   priority: Priority;
   done: boolean;
}
