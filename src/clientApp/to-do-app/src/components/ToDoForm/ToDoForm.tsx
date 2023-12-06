import { Field, Form, Formik } from "formik";
import { ToDoValues, useForm, usePrioritySliderValues } from "./ToDoForm.utils";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import FormikTextField from "components/FormikTextField";
import FormikDateTimePicker from "components/FormikDateTimePicker";
import { Todo } from "shared/services/api";

interface TodoFormProps {
   onSuccess: () => void;
   task?: Todo;
}

const TodoForm = (props: TodoFormProps) => {
   const formProps = useForm(props.onSuccess, props.task);
   const [
      prioritySliderValues,
      defaultSliderValue,
      sliderValueFormat,
      sliderGetAriaValueText,
      minValue,
      maxValue,
   ] = usePrioritySliderValues(props.task?.priority);
   return (
      <Formik
         initialValues={formProps.initialValues}
         onSubmit={formProps.onSubmit}
         validationSchema={formProps.validationSchema}
      >
         {(props) => (
            <Form>
               <Grid
                  container
                  justifyContent="center"
                  spacing={2}
                  sx={{ padding: 3 }}
               >
                  <Grid item xs={12} md={8} xl={6}>
                     <Field
                        component={FormikTextField<ToDoValues>}
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        formikProps={props}
                        formikPropertyName="title"
                     />
                  </Grid>
                  <Box width="100%" />
                  <Grid item xs={12} md={8} xl={6}>
                     <Field
                        component={FormikTextField<ToDoValues>}
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        formikProps={props}
                        formikPropertyName="description"
                        multiline
                        minRows={4}
                        maxRows={10}
                     />
                  </Grid>
                  <Box width="100%" />
                  <Grid item xs={12} md={8} xl={6}>
                     <FormikDateTimePicker<ToDoValues>
                        inputProps={{
                           id: "dueDate",
                           name: "dueDate",
                           fullWidth: true,
                        }}
                        label="Due date"
                        formikProps={props}
                        formikPropertyName="dueDate"
                        disablePast
                     />
                  </Grid>
                  <Box width="100%" />
                  <Grid item xs={12} md={8} xl={6}>
                     <Typography>Priority</Typography>
                     <Slider
                        defaultValue={defaultSliderValue}
                        step={null}
                        valueLabelFormat={sliderValueFormat}
                        getAriaValueText={sliderGetAriaValueText}
                        marks={prioritySliderValues}
                        valueLabelDisplay="auto"
                        max={maxValue}
                        min={minValue}
                        name="priority"
                        id="priority"
                        onChange={props.handleChange}
                     />
                  </Grid>
                  <Box width="100%" />
                  <Grid item xs={12} md={8} xl={6}>
                     <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                     >
                        Submit
                     </Button>
                  </Grid>
                  <Box width="100%" />
               </Grid>
            </Form>
         )}
      </Formik>
   );
};

export default TodoForm;
