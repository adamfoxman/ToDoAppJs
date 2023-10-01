import { ModuleRoute } from "shared/types/config";
import MainPage from "./pages/MainPage";

const routes: ModuleRoute[] = [
   {
      path: "/",
      Component: () => MainPage(),
   },
];

export default routes;
