import { FormikHelpers } from "formik";
import { useAlertContext } from "@/shared/contexts/AlertContext";
import { Schema, object, string } from "yup";
import { getSession, loginUser } from "@/shared/services/AuthService";

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
    const { login, password } = values;

    try {
      const session = await getSession();
      console.log("useOnSubmit", login, password, session);

      const res = await loginUser(login, password).then((res) => {
        session.userId = res._id;
        session.username = res.name;
        session.isLoggedIn = true;
        loginCallback();
      });
    } catch (error) {
      console.log("useOnSubmit", error);

      showMessage("Invalid credentials", "warning");
    }
  };
};

export const useForm = (loginCallback: () => void) => {
  const validationSchema = useValidationSchema();
  const onSubmit = useOnSubmit(loginCallback);
  return { initialValues, validationSchema, onSubmit };
};
