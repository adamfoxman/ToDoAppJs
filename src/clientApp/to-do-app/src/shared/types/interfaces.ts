import { JwtPayload } from "jwt-decode";

//TODO change it
export interface tokenData extends JwtPayload {
   unique_name: string;
   role: string;
   email: string;
}

export interface SignedIdUser {
   email: string;
   login: string;
   role: string;
}
