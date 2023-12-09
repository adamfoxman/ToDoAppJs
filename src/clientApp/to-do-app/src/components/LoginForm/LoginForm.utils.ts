import { AxiosError } from "axios";
import { FormikHelpers } from "formik";
import { useAlertContext } from "shared/contexts/AlertContext";
import Api from "shared/services/api";
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
   const showMessage = useAlertContext();
   return async (
      values: LoginFormValues,
      { resetForm }: FormikHelpers<LoginFormValues>
   ) => {
      const api = new Api();
      const { login, password } = values;
      try {
         await api.login({
            email: login,
            password: password,
         });
         loginCallback();
      } catch (error) {
         const axiosError = error as AxiosError;
         if (axiosError.response?.status === 401) {
            showMessage("Invalid credentials", "warning");
            resetForm();
         }
      }
   };
};

export const useForm = (loginCallback: () => void) => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit(loginCallback);
   return { initialValues, validationSchema, onSubmit };
};
