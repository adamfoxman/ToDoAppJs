import { RegisterPayload } from "shared/services/api";
import { object, string, Schema, ref } from "yup";

export interface RegisterFormValues {
   login: string;
   password: string;
   passwordConfirm: string;
   name: string;
   surname: string;
   email: string;
}

export const initialValues: RegisterFormValues = {
   login: "",
   password: "",
   passwordConfirm: "",
   name: "",
   surname: "",
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
         .required("Pole wymagane")
         .oneOf([ref("password")], "Passwords must match"),
      name: string().required(),
      surname: string().required(),
      email: string().required().email(),
   });
};

export const useOnSubmit = () => {
   return async (values: RegisterFormValues) => {
      var user: RegisterPayload = {
         name: values.name,
         surname: values.surname,
         email: values.email,
         password: values.password,
         login: values.login,
      };
      await new Promise((r) => setTimeout(r, 5000));
      console.log(user);
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};
