import { FunctionComponent } from "react";
import { Field, Form, Formik } from "formik";
import { ToDoValues, useForm } from "./ToDoForm.utils";
import { Button, Grid } from "@mui/material";
import FormikTextField from "components/FormikTextField";

interface TodoFormProps {
   onCreated: () => void;
}

const TodoForm: FunctionComponent<TodoFormProps> = () => {
   const formProps = useForm();
   return (
      <Formik
         initialValues={formProps.initialValues}
         onSubmit={formProps.onSubmit}
      >
         {(props) => (
            <Form>
               <Grid container justifyContent="center" spacing={4}>
                  <Grid item>
                     <FormikTextField<ToDoValues>
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        formikProps={props}
                        formikPropertyName="title"
                     />
                  </Grid>
               </Grid>
               <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
               >
                  Submit
               </Button>
            </Form>
         )}
      </Formik>
   );
};

export default TodoForm;
