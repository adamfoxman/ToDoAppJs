import { useEffect } from "react";
import { useDataGrid } from "./ToDosList.utils";
import { GridRowClassNameParams, GridToolbar } from "@mui/x-data-grid";
import StyledDataGrid, { LateTaskClassName } from "./ToDosList.style";
import { TodoListItem } from "shared/types/interfaces";
import { propertyOf } from "shared/utils";
/*https://mui.com/x/react-data-grid/getting-started/*/
const ToDosList = () => {
   const { todos, getTodos, loading, columns } = useDataGrid();
   useEffect(() => {
      if (!todos) getTodos();
   }, [getTodos, todos]);

   return (
      <StyledDataGrid
         loading={loading}
         rows={todos ?? []}
         columns={columns}
         autoHeight
         disableRowSelectionOnClick
         getRowClassName={({ row }: GridRowClassNameParams<TodoListItem>) =>
            !row.done && row.dueDate && row.dueDate < new Date()
               ? LateTaskClassName
               : ""
         }
         slots={{
            toolbar: GridToolbar,
         }}
         initialState={{
            sorting: {
               sortModel: [
                  { field: propertyOf<TodoListItem>("done"), sort: "asc" },
               ],
            },
         }}
         pageSizeOptions={[5, 10, 20]}
      />
   );
};

export default ToDosList;
