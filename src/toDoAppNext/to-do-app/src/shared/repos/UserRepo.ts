import { INewUser, IUpdateUser, IUser } from "@/shared/db/User";
import UserModel from "@/shared/db/User";
import connectDB from "@/shared/db/connectDB";

import PwdUtil from "@/shared/util/PwdUtil";

async function getOne(email: string): Promise<IUser | null> {
   await connectDB();
   return await UserModel.findOne({ email }).exec();
}

async function persists(id: string): Promise<boolean> {
   await connectDB();
   return (await UserModel.exists({ id })) !== null ? true : false;
}

async function persistsEmail(email: string) {
   await connectDB();
   return (await UserModel.exists({ email })) !== null ? true : false;
}

async function getAll(): Promise<IUser[]> {
   await connectDB();
   return await UserModel.find().exec();
}

async function add(user: INewUser): Promise<void> {
   await connectDB();
   const pwdHash = await PwdUtil.getHash(user.password);
   const newUser: IUser = new UserModel({
      name: user.name,
      email: user.email,
      pwdHash,
      role: user.role,
   });
   await newUser.save();
}

async function update(user: IUpdateUser): Promise<void> {
   await connectDB();
   const updatedUser: IUser = new UserModel({
      name: user.name,
      email: user.email,
      pwdHash: user.password ? await PwdUtil.getHash(user.password) : undefined,
      role: user.role,
   });
   await UserModel.updateOne({ id: user.id }, updatedUser).exec();
}

async function delete_(id: string): Promise<void> {
   await connectDB();
   await UserModel.findOneAndDelete({ id }).exec();
}

export default {
   getOne,
   persists,
   persistsEmail,
   getAll,
   add,
   update,
   delete: delete_,
} as const;
