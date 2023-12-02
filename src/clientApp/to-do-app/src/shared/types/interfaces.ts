import { JwtPayload } from "jwt-decode";

//TODO change it
export interface tokenData extends JwtPayload {
   id: string;
   role: string;
   email: string;
   name: string;
}

export interface SignedIdUser {
   email: string;
   name: string;
   role: string;
   id: string;
}
