import { HttpStatusCode } from "axios";
import Api, { RegisterPayload } from "shared/services/api";
import { object, string, Schema, ref } from "yup";

export interface RegisterFormValues {
   login: string;
   password: string;
   passwordConfirm: string;
   email: string;
}

export const initialValues: RegisterFormValues = {
   login: "",
   password: "",
   passwordConfirm: "",
   email: "",
};

export const useValidationSchema = (): Schema<RegisterFormValues> => {
   return object().shape({
      login: string().required(),
      password: string()
         .required()
         .min(8)
         .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "The password must contain an uppercase letter, a lowercase letter, a number and a special character"
         ),
      passwordConfirm: string()
         .required()
         .oneOf([ref("password")], "Passwords must match"),
      email: string().required().email(),
   });
};

export const useOnSubmit = () => {
   return async (values: RegisterFormValues) => {
      var user: RegisterPayload = {
         email: values.email,
         password: values.password,
         login: values.login,
      };
      const api = new Api();
      const response = await api.registerUser(user);
      if (response.status === HttpStatusCode.Created) {
         alert("User registered successfully");
      } else {
         alert("User registration failed");
      }
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};
