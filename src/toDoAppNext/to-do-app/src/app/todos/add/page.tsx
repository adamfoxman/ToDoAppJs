import { Divider, Typography } from "@mui/material";
import TodoForm from "@/components/ToDoForm/ToDoForm";
import { redirect } from "next/navigation";

const AddTodoPage = () => {
   const onCreated = async () => {
      "use server";
      redirect("/todos");
   };

   return (
      <>
         <Typography variant="h3">Add new task</Typography>
         <Divider />
         <TodoForm onSuccess={onCreated} />
      </>
   );
};

export default AddTodoPage;
