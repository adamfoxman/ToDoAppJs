import { Schema, date, object, string } from "yup";

export interface ToDoValues {
   title: string;
   description: string;
   dueDate?: Date;
}

export const initialValues: ToDoValues = {
   title: "",
   description: "",
   dueDate: new Date(),
};

export const useValidationSchema = (): Schema<ToDoValues> => {
   return object({
      title: string()
         .required("Title is required")
         .min(3, "Title is too short"),
      description: string().required("Description is required"),
      dueDate: date().min(new Date(), "Due date must be in the future"),
   });
};

export const useOnSubmit = () => {
   return async (values: ToDoValues) => {
      console.log(values);
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};
