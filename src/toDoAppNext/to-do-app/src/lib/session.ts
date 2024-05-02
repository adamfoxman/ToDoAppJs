import { getIronSession, SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  username?: string;
  img?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: "iwvguiyv4uityv324uityvui34yvt3ui24vyt23yui",
  cookieName: "lama-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export default function withSession(handler: any) {
  return getIronSession<SessionData>(handler, sessionOptions);
}

