import { Schema, model, Document } from 'mongoose';

export enum UserRoles {
  Standard = 'STANDARD',
  Admin = 'ADMIN',
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
  role: UserRoles;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pwdHash: { type: String, required: false },
  role: { type: String, enum: UserRoles, required: false },
});

UserSchema.virtual('id').get(function (this: IUser) : string {
  return this._id;
});

UserSchema.virtual('url').get(function (this: IUser) : string {
  return `/users/${this._id}`;
});

export default model<IUser>('User', UserSchema);