import { IUser, UserModel } from '@src/models/User';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import mongoose from 'mongoose';


// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(email: string): Promise<IUser | null> {
  return await UserModel.findOne({ email }).exec();
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  return (await UserModel.exists({ id })) !== null ? true : false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  return UserModel.find().exec();
}

/**
 * Add one user.
 */
async function add(user: IUser): Promise<void> {
  const newUser = new UserModel(user);
  await newUser.save();
}

/**
 * Update a user.
 */
async function update(user: IUser): Promise<void> {
  await UserModel.updateOne({ id: user.id }, user).exec();
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  await UserModel.findOneAndDelete({ id }).exec();
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
