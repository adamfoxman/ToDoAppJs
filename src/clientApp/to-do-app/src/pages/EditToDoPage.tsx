import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { paths } from "config";
import { Box, Divider, Typography } from "@mui/material";
import TodoForm from "components/ToDoForm/ToDoForm";
import { useParams } from "react-router-dom";
import Api, { Todo } from "shared/services/api";
import { useAlertContext } from "shared/contexts/AlertContext";
import Loader from "components/Loader/Loader";

const EditTodoPage = () => {
   const [edited, setEdited] = useState<boolean>(false);
   const [taskFetched, setTaskFetched] = useState<boolean>(false);
   const navigate = useNavigate();

   const onEdit = () => {
      setEdited(true);
   };

   useEffect(() => {
      if (edited) {
         navigate(paths.todos.main);
      }
   }, [edited, navigate]);

   const { id } = useParams<{ id: string }>();
   const [task, setTask] = useState<Todo | undefined>(undefined);
   const [loading, setLoading] = useState(false);
   const showMessage = useAlertContext();
   useEffect(() => {
      async function fetchTask(id: string) {
         try {
            const api = new Api();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const { task } = await api.getTodoById(id);
            setTask(task);
         } catch (error) {
            showMessage("Error while fetching task from server", "error");
         } finally {
            setLoading(false);
         }
      }
      if (id && !taskFetched) {
         setLoading(true);
         fetchTask(id);
         setTaskFetched(true);
      }
   }, [id, showMessage, taskFetched]);
   return (
      <>
         <Typography variant="h3">Edit task</Typography>
         <Divider />
         {task && <TodoForm onSuccess={onEdit} task={task} />}
         {loading && (
            <Box position="absolute" height="50%" zIndex="modal">
               <Loader />
            </Box>
         )}
      </>
   );
};

export default EditTodoPage;
