import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { paths } from "config";
import { Divider, Typography } from "@mui/material";
import TodoForm from "components/ToDoForm/ToDoForm";

const AddTodoPage = () => {
   const [created, setCreated] = useState<boolean>(false);
   const navigate = useNavigate();

   const onCreated = () => {
      setCreated(true);
   };

   useEffect(() => {
      if (created) {
         navigate(paths.todos);
      }
   }, [created, navigate]);
   return (
      <>
         <Typography variant="h3">Add new task</Typography>
         <Divider />
         <TodoForm onCreated={onCreated} />
      </>
   );
};

export default AddTodoPage;
