import { Divider, Grid, IconButton, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { paths } from "config";
import ToDosList from "components/ToDosList/ToDosList";

const ToDosPage = () => {
   return (
      <>
         <Grid container justifyContent="space-beetwen">
            <Grid item xs={11}>
               <Typography variant="h3">Your tasks</Typography>
            </Grid>

            <Grid item xs={1}>
               <IconButton
                  size="large"
                  component={Link}
                  to={paths.todos.addTodo}
               >
                  <AddCircleOutlineOutlinedIcon fontSize="inherit" />
               </IconButton>
            </Grid>
         </Grid>
         <Divider sx={{ my: 2 }} />
         <ToDosList />
      </>
   );
};

export default ToDosPage;
