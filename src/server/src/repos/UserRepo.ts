import { IUser } from '@src/models/User';
import UserModel from '@src/models/User';

async function getOne(email: string): Promise<IUser | null> {
  return await UserModel.findOne({ email }).exec();
}

async function persists(id: number): Promise<boolean> {
  return (await UserModel.exists({ id })) !== null ? true : false;
}

async function getAll(): Promise<IUser[]> {
  return await UserModel.find().exec();
}

async function add(user: IUser): Promise<void> {
  const newUser: IUser = new UserModel(user);
  await newUser.save();
}

async function update(user: IUser): Promise<void> {
  await UserModel.updateOne({ id: user.id }, user).exec();
}

async function delete_(id: number): Promise<void> {
  await UserModel.findOneAndDelete({ id }).exec();
}

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
