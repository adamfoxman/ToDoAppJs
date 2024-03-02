"use client";
import { useForm, RegisterFormValues } from "./RegisterForm.utils";
import { Field, Form, Formik } from "formik";
import { Box, Button, Grid } from "@mui/material";
import FormikTextField from "@/components/FormikTextField";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { paths } from "@/config";

const RegisterForm = () => {
   const formProps = useForm();
   const router = useRouter();
   const redirectToLogin = useCallback(() => {
      router.push(paths.auth.login);
   }, [router]);
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
                  sx={{ paddingTop: 2 }}
               >
                  <Grid item xs={12} md={6}>
                     <Field
                        component={FormikTextField<RegisterFormValues>}
                        id="name"
                        name="name"
                        label="Name"
                        formikProps={props}
                        formikPropertyName="name"
                        fullWidth
                     />
                  </Grid>
                  {props.isSubmitting && (
                     <Box position="absolute" height="50%" zIndex="modal">
                        <Loader />
                     </Box>
                  )}

                  <Grid item xs={12} md={6}>
                     <Field
                        component={FormikTextField<RegisterFormValues>}
                        id="email"
                        name="email"
                        label="E-mail address"
                        formikProps={props}
                        formikPropertyName="email"
                        fullWidth
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <Field
                        component={FormikTextField<RegisterFormValues>}
                        id="password"
                        name="password"
                        label="Password"
                        formikProps={props}
                        formikPropertyName="password"
                        type="password"
                        fullWidth
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <Field
                        component={FormikTextField<RegisterFormValues>}
                        id="passwordConfirm"
                        name="passwordConfirm"
                        label="Confirm password"
                        formikProps={props}
                        formikPropertyName="passwordConfirm"
                        type="password"
                        fullWidth
                     />
                  </Grid>
                  <Grid item xs={12} md={5}>
                     <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                        disabled={!props.isValid}
                     >
                        Sign up
                     </Button>
                     <Button
                        type="button"
                        variant="text"
                        fullWidth
                        color="primary"
                        onClick={redirectToLogin}
                     >
                        Already registered? Sign in!
                     </Button>
                  </Grid>
               </Grid>
            </Form>
         )}
      </Formik>
   );
};

export default RegisterForm;
