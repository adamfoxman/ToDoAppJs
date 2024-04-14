import TaskModel, { ITask } from "@/shared/db/Task";
import { ISessionUser } from "@/shared/db/User";
import connectDB from "../db/connectDB";

async function getAll(user: ISessionUser | undefined): Promise<ITask[]> {
   await connectDB();
   return TaskModel.find({
      owner: user?.id,
   }).exec();
}

async function persists(id: string): Promise<boolean> {
   await connectDB();
   return (await TaskModel.exists({ _id: id })) !== null ? true : false;
}

async function add(task: ITask): Promise<void> {
   await connectDB();
   const newTask: ITask = new TaskModel(task);
   await newTask.save();
}

async function update(task: ITask): Promise<void> {
   await connectDB();
   await TaskModel.updateOne({ _id: task._id }, task).exec();
}

async function delete_(
   id: string,
   user: ISessionUser | undefined
): Promise<void> {
   await connectDB();
   await TaskModel.findOneAndDelete({ _id: id }).exec();
}

async function getOneWithUserCheck(
   id: string,
   user: ISessionUser
): Promise<ITask | null> {
   await connectDB();
   return TaskModel.findOne({ _id: id, owner: user.id }).exec();
}

async function updateWithUserCheck(
   task: ITask,
   user: ISessionUser | undefined
): Promise<void> {
   await connectDB();
   console.log(task, user?.id);
   await TaskModel.updateOne({ _id: task._id, owner: user?.id }, task).exec();
}

export default {
   getAll,
   persists,
   add,
   update,
   delete: delete_,
   getOneWithUserCheck,
   updateWithUserCheck,
} as const;
