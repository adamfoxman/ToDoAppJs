"use server";
import UserRepo from "@/shared/repos/UserRepo";
import { INewUser, IUser, IUpdateUser, UserRoles } from "@/shared/db/User";

const USER_NOT_FOUND_ERR = "User not found";
const USER_EMAIL_EXISTS_ERR = "Email already exists";

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
   return UserRepo.getAll();
}

/**
 * Add one user.
 */
export async function addOne(user: INewUser): Promise<void> {
   const persists = await UserRepo.persistsEmail(user.email);
   if (persists) {
      throw new Error(USER_EMAIL_EXISTS_ERR);
   }
   return UserRepo.add(user);
}

/**
 * Register new user.
 */
export async function register(user: INewUser): Promise<void> {
   const persists = await UserRepo.persistsEmail(user.email);
   if (persists) {
      throw new Error(USER_EMAIL_EXISTS_ERR);
   }
   // Add user
   user.role = UserRoles.Standard;
   return UserRepo.add(user);
}

/**
 * Update one user.
 */
export async function updateOne(user: IUpdateUser): Promise<void> {
   const persists = await UserRepo.persists(user.id);
   if (!persists) {
      throw new Error(USER_NOT_FOUND_ERR);
   }
   if (user.email) {
      const emailPersists = await UserRepo.persistsEmail(user.email);
      if (emailPersists) {
         throw new Error(USER_EMAIL_EXISTS_ERR);
      }
   }
   // Return user
   return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
export async function _delete(id: string): Promise<void> {
   const persists = await UserRepo.persists(id);
   if (!persists) {
      throw new Error(USER_NOT_FOUND_ERR);
   }
   // Delete user
   return UserRepo.delete(id);
}
