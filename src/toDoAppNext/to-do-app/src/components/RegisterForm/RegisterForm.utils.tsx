import { object, string, Schema, ref } from "yup";
import { useAlertContext } from "@/shared/contexts/AlertContext";
import { paths } from "@/config";
import { useRouter } from "next/navigation";
import { addOne } from "@/shared/services/UserService";

export interface RegisterFormValues {
   name: string;
   password: string;
   passwordConfirm: string;
   email: string;
}

export const initialValues: RegisterFormValues = {
   name: "",
   password: "",
   passwordConfirm: "",
   email: "",
};

export const useValidationSchema = (): Schema<RegisterFormValues> => {
   return object().shape({
      name: string().required(),
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
   const showMessage = useAlertContext();
   const router = useRouter();
   return async (values: RegisterFormValues) => {
      try {
         await addOne({
            name: values.name,
            email: values.email,
            password: values.password,
         });
         showMessage(
            "You have successfully created an account. Now you can sign in",
            "success"
         );
         router.push(paths.auth.login);
      } catch (error) {
         showMessage("Registration error. Please try again later", "error");
      }
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};
