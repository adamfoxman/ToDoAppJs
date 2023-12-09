import { RouteProps } from "react-router-dom";

export type ModuleRoute = RouteProps & {
   path: string;
   public?: boolean;
};
