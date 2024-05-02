"use server";

import UserRepo from "../repos/UserRepo";

import PwdUtil from "../util/PwdUtil";

import { HttpStatusCodes } from "../types/enums";
import { IUser } from "../db/User";
import withSession from "@/lib/session";
import { cookies } from "next/headers";
import { defaultSession } from "@/lib/session";
import { redirect } from "next/navigation";

class RouteError extends Error {
  public status: HttpStatusCodes;

  public constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}

const Errors = {
  Unauth: "Unauthorized",
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;

export async function getSession() {
  const session = withSession(cookies());

  return session;
}

export async function loginUser(
  email: string,
  password: string
): Promise<IUser> {
  console.log("loginUser", email, password);
  
  const user = await UserRepo.getOne(email);
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.EmailNotFound(email)
    );
  }

  const hash = user.pwdHash ?? "",
    pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, Errors.Unauth);
  }

  return user;
}

export async function logoutUser() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
