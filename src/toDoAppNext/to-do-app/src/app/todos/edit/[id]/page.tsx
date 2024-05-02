import { Divider, Typography } from "@mui/material";
import TodoForm from "@/components/ToDoForm/ToDoForm";
import { getOne } from "@/shared/services/TasksService";
import { ISessionUser } from "@/shared/db/User";
import { notFound, redirect } from "next/navigation";

export interface EditTodoPageProps {
   params: {
      id: string;
   };
}

const EditTodoPage = async (props: EditTodoPageProps) => {
   var id = props.params.id;
   var task = await getOne(id, {
      id: "5f9a2b9a9d6b2b1b1c9d9c9d",
   } as ISessionUser); //todo replace it with logged in user id

   const onEdit = async () => {
      "use server";
      redirect("/todos");
   };

   return task ? (
      <>
         <Typography variant="h3">Edit task</Typography>
         <Divider />
         {task && <TodoForm onSuccess={onEdit} task={task} />}
      </>
   ) : (
      notFound()
   );
};

export default EditTodoPage;
