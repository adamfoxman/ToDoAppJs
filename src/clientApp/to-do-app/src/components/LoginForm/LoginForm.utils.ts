import Auth from "shared/services/Auth";
import { Schema, object, string } from "yup";

export interface LoginFormValues {
   login: string;
   password: string;
}

export const initialValues: LoginFormValues = {
   login: "",
   password: "",
};

export const useValidationSchema = (): Schema<LoginFormValues> => {
   return object().shape({
      login: string().required(),
      password: string().required(),
   });
};

export const useOnSubmit = (loginCallback: () => void) => {
   return async (values: LoginFormValues) => {
      alert(JSON.stringify(values, null, 2));
      //TODO temp code below
      //{
      //   "unique_name": "john_doe_11",
      //   "role": "Standard",
      //   "email": "john.doe@gmail.com"
      // }
      Auth.setToken(
         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImpvaG5fZG9lXzExIiwicm9sZSI6IlN0YW5kYXJkIiwiZW1haWwiOiJqb2huLmRvZUBnbWFpbC5jb20ifQ.maznwxSTKONpwpz6yq46vOIHPtEqSG_tjxYWhhm7niM"
      );
      loginCallback();
   };
};

export const useForm = (loginCallback: () => void) => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit(loginCallback);
   return { initialValues, validationSchema, onSubmit };
};
