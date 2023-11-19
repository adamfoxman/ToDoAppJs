import { ModuleRoute } from "shared/types/config";
import MainPage from "./pages/MainPage";
import TodosPage from "./pages/ToDosPage";
import AddTodoPage from "./pages/AddToDoPage";
import RegisterPage from "./pages/Register";

const routes: ModuleRoute[] = [
   {
      path: "/",
      Component: () => MainPage(),
   },
   {
      path: "/todos",
      Component: () => TodosPage(),
   },
   {
      path: "/todos/add",
      Component: () => AddTodoPage(),
   },
   {
      path: "/register",
      Component: () => RegisterPage(),
   },
];

export default routes;
