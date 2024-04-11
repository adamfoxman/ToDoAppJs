"use server";

import { ITask } from "@/shared/db/Task";
import { ISessionUser } from "@/shared/db/User";
import TaskRepo from "@/shared/repos/TaskRepo";

export async function getAll(user: ISessionUser | undefined): Promise<ITask[]> {
   return await TaskRepo.getAll(user);
}

export const addOne = async (task: ITask) => {
   await TaskRepo.add(task);
};

export async function updateOne(task: ITask, user: ISessionUser | undefined) {
   const persists = await TaskRepo.persists(task._id);
   if (!persists) {
      throw new Error("Task not found");
   }

   await TaskRepo.updateWithUserCheck(task, user);
}

export async function _delete(id: string, user: ISessionUser | undefined) {
   const persists = await TaskRepo.persists(id);
   if (!persists) {
      throw new Error("Task not found");
   }

   await TaskRepo.delete(id, user);
}

export async function getOne(
   id: string,
   user?: ISessionUser
): Promise<ITask | null> {
   if (user) return await TaskRepo.getOneWithUserCheck(id, user);
   else return null;
}
