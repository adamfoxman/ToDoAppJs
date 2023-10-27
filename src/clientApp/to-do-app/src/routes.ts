import { ModuleRoute } from "shared/types/config";
import MainPage from "./pages/MainPage";
import TodosPage from "./pages/ToDosPage";
import AddTodoPage from "./pages/AddToDoPage";

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
];

export default routes;
