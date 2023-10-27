import { Priority } from "shared/types/enums";
import { Schema, date, mixed, object, string } from "yup";

export interface ToDoValues {
   title: string;
   description: string;
   dueDate?: Date | null;
   priority: Priority;
}

export const initialValues: ToDoValues = {
   title: "",
   description: "",
   dueDate: null,
   priority: Priority.LOW,
};

export const useValidationSchema = (): Schema<ToDoValues> => {
   return object({
      title: string()
         .required("Title is required")
         .min(3, "Title is too short"),
      description: string()
         .required("Description is required")
         .max(1000, "Description is too long. Max 1000 characters"),
      dueDate: date()
         .min(new Date(), "Due date must be in the future")
         .typeError("Incorrect date format")
         .nullable(),
      priority: mixed<Priority>()
         .oneOf(Object.values(Priority) as number[])
         .required(),
   });
};

export const useOnSubmit = () => {
   return async (values: ToDoValues) => {
      console.log(values);
   };
};

export const useForm = () => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit();
   return { initialValues, validationSchema, onSubmit };
};

export const usePrioritySliderValues = (): [
   Array<{ value: number; label: string }>,
   Priority,
   (value: Priority) => string | undefined,
   (value: Priority) => string
] => {
   const prioritySliderValues: Array<{ value: number; label: string }> = [
      {
         value: Priority.LOW,
         label: "Low",
      },
      {
         value: Priority.MEDIUM,
         label: "Medium",
      },
      {
         value: Priority.HIGH,
         label: "High",
      },
      {
         value: Priority.VERY_HIGH,
         label: "Very High",
      },
   ];

   const defaultPrioritySliderValue = Priority.LOW;

   const sliderLabelValueFormat = (value: Priority) =>
      prioritySliderValues.find((item) => item.value === value)?.label;

   const sliderGetAriaValueText = (value: Priority) =>
      `${sliderLabelValueFormat(value)}`;

   return [
      prioritySliderValues,
      defaultPrioritySliderValue,
      sliderLabelValueFormat,
      sliderGetAriaValueText,
   ];
};
