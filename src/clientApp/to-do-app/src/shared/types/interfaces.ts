import { JwtPayload } from "jwt-decode";

export interface tokenData extends JwtPayload {
   unique_name: string;
   email: string;
   given_name: string;
   family_name: string;
}

export interface SignedIdUser {
   name: string;
   surname: string;
   email: string;
   login: string;
}
