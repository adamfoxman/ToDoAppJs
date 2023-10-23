import { TextField, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";

type FormikTextFieldProps<T> = TextFieldProps & {
   formikPropertyName: keyof T;
   formikProps: FormikProps<T>;
};

const FormikTextField = <T,>(props: FormikTextFieldProps<T>) => {
   const { formikPropertyName, formikProps, ...otherProps } = props;
   return (
      <TextField
         {...otherProps}
         value={formikProps.values[formikPropertyName]}
         onChange={formikProps.handleChange}
         onBlur={formikProps.handleBlur}
         error={
            formikProps.touched[formikPropertyName] &&
            Boolean(formikProps.errors[formikPropertyName])
         }
         helperText={
            formikProps.touched[formikPropertyName] &&
            (formikProps.errors[formikPropertyName] as string)
         }
      />
   );
};

export default FormikTextField;
