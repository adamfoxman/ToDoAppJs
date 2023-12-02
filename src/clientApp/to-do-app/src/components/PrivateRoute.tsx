import { paths } from "config";
import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useAuth } from "shared/hooks/useAuth";

const PrivateRoute = (props: RouteProps) => {
   const { isAuthenticated } = useAuth();
   return isAuthenticated ? (
      <Outlet />
   ) : (
      <Navigate replace to={paths.auth.login} />
   );
};

export default PrivateRoute;
