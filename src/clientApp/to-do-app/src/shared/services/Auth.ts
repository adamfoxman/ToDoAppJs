import config from "config";
import { jwtDecode } from "jwt-decode";
import { tokenData, SignedIdUser } from "shared/types/interfaces";

class Auth {
   static setToken(token: string) {
      return localStorage.setItem(config.storageTokenKey, token);
   }

   static getToken() {
      return localStorage.getItem(config.storageTokenKey);
   }

   static getTokenData() {
      const token = Auth.getToken();
      if (token !== null) {
         const data = jwtDecode<tokenData>(token);

         const user: SignedIdUser = {
            email: data.email,
            login: data.unique_name,
            role: data.role,
         };

         return user;
      }
   }

   static isAuthenticated() {
      return !!Auth.getToken();
   }

   static logout() {
      localStorage.removeItem(config.storageTokenKey);
      window.location.reload();
   }
}

export default Auth;
