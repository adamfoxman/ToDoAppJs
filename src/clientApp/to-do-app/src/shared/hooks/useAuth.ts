import Auth from "shared/services/Auth";

export const useAuth = () => {
   const isAuthenticated = Auth.isAuthenticated();
   const tokenData = Auth.getTokenData();

   return { isAuthenticated, logout: Auth.logout, tokenData };
};
