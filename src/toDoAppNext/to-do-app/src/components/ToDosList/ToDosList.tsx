"use client";
import { useEffect } from "react";
import { useDataGrid } from "./ToDosList.utils";
import { GridRowClassNameParams, GridToolbar } from "@mui/x-data-grid";
import StyledDataGrid, { LateTaskClassName } from "./ToDosList.style";
import { propertyOf } from "@/shared/utils";
import { ITask } from "@/shared/db/Task";
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
         disableRowSelectionOnClick
         getRowClassName={({ row }: GridRowClassNameParams<ITask>) =>
            !row.done && row.dueDate && row.dueDate < new Date()
               ? LateTaskClassName
               : ""
         }
         slots={{
            toolbar: GridToolbar,
         }}
         initialState={{
            sorting: {
               sortModel: [{ field: propertyOf<ITask>("done"), sort: "asc" }],
            },
            pagination: { paginationModel: { pageSize: 10 } },
         }}
         pageSizeOptions={[5, 10, 20, 40]}
         getRowId={(row) => row._id}
      />
   );
};

export default ToDosList;
