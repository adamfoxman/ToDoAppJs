"use client";
import { paths } from "@/config";
import { Field, Form, Formik } from "formik";
import Loader from "@/components/Loader/Loader";
import { useForm, LoginFormValues } from "./LoginForm.utils";
import { Box, Button, Grid } from "@mui/material";
import FormikTextField from "@/components/FormikTextField";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const onLogin = () => {
    router.push(paths.main);
  };
  const formProps = useForm(onLogin);

  const redirectToRegister = () => router.push(paths.auth.register);
  return (
    <Formik {...formProps}>
      {(props) => (
        <Form>
          <Grid container spacing={2}>
            {props.isSubmitting && (
              <Box position="absolute" height="50%" zIndex="modal">
                <Loader />
              </Box>
            )}
            <Grid item xs={12}>
              <Field
                component={FormikTextField<LoginFormValues>}
                id="login"
                name="login"
                label="Username"
                formikProps={props}
                formikPropertyName="login"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={FormikTextField<LoginFormValues>}
                id="password"
                name="password"
                label="Password"
                formikProps={props}
                formikPropertyName="password"
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                disabled={!props.isValid || props.isSubmitting}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                variant="text"
                fullWidth
                color="primary"
                onClick={redirectToRegister}
              >
                Not registered yet? Sign up!
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
