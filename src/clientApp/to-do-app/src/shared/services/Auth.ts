import config from "config";
import { jwtDecode } from "jwt-decode";
import { tokenData, SignedIdUser } from "shared/types/interfaces";
import Cookies from "js-cookie";

class Auth {
   static getToken() {
      let cookie = Cookies.get(config.storageTokenKey);
      if (cookie) cookie = cookie.substring(2);
      return cookie;
   }

   static getTokenData() {
      const token = Auth.getToken();
      if (token) {
         const data = jwtDecode<tokenData>(token);
         const user: SignedIdUser = { ...data };
         return user;
      }
   }

   static isAuthenticated() {
      return !!Auth.getToken();
   }

   static logout() {
      Cookies.remove(config.storageTokenKey);
      window.location.reload();
   }
}

export default Auth;
