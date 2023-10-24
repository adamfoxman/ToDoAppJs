import { Schema, model, Document } from 'mongoose';

export enum UserRoles {
  Standard,
  Admin,
}

export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  pwdHash?: string;
  role?: UserRoles;
}

export interface ISessionUser {
  id: number;
  email: string;
  name: string;
  role: IUser['role'];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pwdHash: { type: String, required: false },
  role: { type: String, enum: UserRoles, required: false },
});

export default model<IUser>('User', UserSchema);