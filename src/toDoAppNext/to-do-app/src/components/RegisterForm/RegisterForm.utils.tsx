import { object, string, Schema, ref } from "yup";
//import { useAlertContext } from "shared/contexts/AlertContext";
import { paths } from "@/config";
import { useRouter } from "next/navigation";

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
   //const showMessage = useAlertContext();
   const router = useRouter();
   return async (values: RegisterFormValues) => {
      alert(JSON.stringify(values));
      //    var user: RegisterPayload = {
      //       email: values.email,
      //       password: values.password,
      //       name: values.name,
      //    };
      //    const api = new Api();
      //    try {
      //       const response = await api.registerUser(user);
      //       if (response.status === HttpStatusCode.Created) {
      //          showMessage(
      //             "You have successfully created an account. Now you can sign in",
      //             "success"
      //          );
      //          navigate(paths.auth.login);
      //       } else {
      //          showMessage(
      //             `Registration error: ${response.data} ${response.statusText}`,
      //             "error"
      //          );
      //       }
      //    } catch (error) {
      //       const axiosErr = error as AxiosError<{ error: string }>;
      //       if (axiosErr.response?.status === HttpStatusCode.BadRequest)
      //          showMessage(axiosErr.response.data.error, "error");
      //       else
      //          showMessage("Registration error. Please try again later", "error");
      //    }
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};
