import { AxiosError } from "axios";
import { useMemo } from "react";
import { useAlertContext } from "shared/contexts/AlertContext";
import { useAuth } from "shared/hooks/useAuth";
import { CreateTodoPayload } from "shared/services/api";
import Api from "shared/services/api/api";
import { Priority } from "shared/types/enums";
import { Schema, date, number, object, string } from "yup";

export interface ToDoValues {
   title: string;
   description: string;
   dueDate?: Date | null;
   priority: number;
}

export const initialValues: ToDoValues = {
   title: "",
   description: "",
   dueDate: null,
   priority: 1,
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
      priority: number().required().max(4).min(1).integer(),
   });
};

export const useOnSubmit = (submitCallback: () => void) => {
   const { tokenData } = useAuth();
   const enumValues = useMapPriorityValueToEnum();
   const showMessage = useAlertContext();
   return async (values: ToDoValues) => {
      const api = new Api();
      const { dueDate, priority, ...rest } = values;
      const payload: CreateTodoPayload = {
         dueDate: values.dueDate === null ? undefined : values.dueDate,
         done: false,
         owner: tokenData?.id || "",
         priority:
            enumValues.find(({ value }) => value === priority)?.enumValue ||
            Priority.LOW,
         ...rest,
      };
      try {
         const res = await api.addTodo(payload);
         if (res.status === 201) {
            showMessage("Task added successfully", "success");
            submitCallback();
         } else {
            showMessage("Something went wrong", "error");
         }
      } catch (error) {
         const axiosError = error as AxiosError;
         showMessage(
            `Server returned status ${axiosError.status}, message: ${axiosError.message}`,
            "error"
         );
      }
   };
};

export const useForm = (submitCallback: () => void) => {
   const validationSchema = useValidationSchema();
   const onSubmit = useOnSubmit(submitCallback);
   return { initialValues, validationSchema, onSubmit };
};

const useMapPriorityValueToEnum = () => {
   return useMemo<Array<{ value: number; label: string; enumValue: Priority }>>(
      () => [
         {
            value: 1,
            label: "Low",
            enumValue: Priority.LOW,
         },
         {
            enumValue: Priority.MEDIUM,
            label: "Medium",
            value: 2,
         },
         {
            enumValue: Priority.HIGH,
            label: "High",
            value: 3,
         },
         {
            enumValue: Priority.VERY_HIGH,
            label: "Very High",
            value: 4,
         },
      ],
      []
   );
};

export const usePrioritySliderValues = (): [
   Array<{ value: number; label: string; enumValue: Priority }>,
   number,
   (value: number) => string | undefined,
   (value: number) => string,
   number,
   number
] => {
   const prioritySliderValues = useMapPriorityValueToEnum();

   const defaultPrioritySliderValue = 1;

   const sliderLabelValueFormat = (value: number) =>
      prioritySliderValues.find((item) => item.value === value)?.label;

   const sliderGetAriaValueText = (value: number) =>
      `${sliderLabelValueFormat(value)}`;

   const minValue = 1;
   const maxValue = 4;

   return [
      prioritySliderValues,
      defaultPrioritySliderValue,
      sliderLabelValueFormat,
      sliderGetAriaValueText,
      minValue,
      maxValue,
   ];
};
