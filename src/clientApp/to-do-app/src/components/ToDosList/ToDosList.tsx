import { useEffect } from "react";
import { useDataGrid, useGetTodos } from "./ToDosList.utils";
import { DataGrid } from "@mui/x-data-grid";
/*https://mui.com/x/react-data-grid/getting-started/*/
const ToDosList = () => {
   const { todos, getTodos, loading } = useGetTodos();
   useEffect(() => {
      if (!todos) getTodos();
   }, [getTodos, todos]);

   const [colDefs] = useDataGrid();

   return (
      <>
         {todos && (
            <DataGrid
               loading={loading}
               rows={todos}
               columns={colDefs}
               autoHeight
            />
         )}
      </>
   );
};

export default ToDosList;
