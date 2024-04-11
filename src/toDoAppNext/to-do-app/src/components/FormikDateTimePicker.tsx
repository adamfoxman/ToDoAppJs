import { TextFieldProps } from "@mui/material";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FormikProps } from "formik";

type FormikTextFieldProps<T> = DateTimePickerProps<dayjs.Dayjs> & {
   formikPropertyName: keyof T;
   formikProps: FormikProps<T>;
   inputProps?: TextFieldProps;
};

const FormikDateTimePicker = <T,>(props: FormikTextFieldProps<T>) => {
   const { formikPropertyName, formikProps, inputProps, ...otherProps } = props;
   const value = formikProps.values[formikPropertyName] as Date;
   return (
      <DateTimePicker
         {...otherProps}
         value={value ? dayjs(value) : null}
         onChange={(value) => {
            formikProps.setFieldValue(
               formikPropertyName as string,
               value?.toDate(),
               true
            );
         }}
         slotProps={{
            textField: {
               error:
                  formikProps.touched[formikPropertyName] &&
                  Boolean(formikProps.errors[formikPropertyName]),
               helperText:
                  formikProps.touched[formikPropertyName] &&
                  (formikProps.errors[formikPropertyName] as string),
               ...inputProps,
            },
         }}
      />
   );
};

export default FormikDateTimePicker;
