import { useMemo } from "react";
import { useAlertContext } from "@/shared/contexts/AlertContext";
import { Priority } from "@/shared/types/enums";
import { Schema, date, number, object, string } from "yup";
import { ITask } from "@/shared/db/Task";
import { addOne, updateOne } from "@/shared/services/TasksService";
import { ISessionUser } from "@/shared/db/User";
import { getSession } from "@/shared/services/AuthService";

export interface ToDoValues {
  title: string;
  description: string;
  dueDate?: Date | null;
  priority: number;
}

const useInitialValues = (task?: ITask): ToDoValues => {
  const enumValues = useMapPriorityValueToEnum();

  return useMemo<ToDoValues>(
    (): ToDoValues => ({
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? new Date(task.dueDate) : null,
      priority: task
        ? enumValues.find((x) => x.enumValue === task.priority)?.value ?? 1
        : 1,
    }),
    [enumValues, task]
  );
};

export const useValidationSchema = (): Schema<ToDoValues> => {
  return object({
    title: string().required("Title is required").min(3, "Title is too short"),
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

export const useOnSubmit = (
  submitCallback: () => void,
  isEdit: boolean,
  id?: string
) => {
  const enumValues = useMapPriorityValueToEnum();
  const showMessage = useAlertContext();

  const create = async (values: ToDoValues) => {
    const session = await getSession();
    const payload = {
      owner: "5f9a2b9a9d6b2b1b1c9d9c9d" || "",
      title: values.title,
      description: values.description,
      done: false,
      dueDate: values.dueDate === null ? undefined : values.dueDate,
      priority:
        enumValues.find(({ value }) => value === values.priority)?.enumValue ||
        Priority.LOW,
    };
    try {
      await addOne(payload as ITask);
      showMessage("Task added successfully", "success");
      submitCallback();
    } catch (error) {
      const err = error as Error;
      showMessage(`Failed: ${err.message}, ${err.name}`, "error");
    }
  };
  const edit = async (values: ToDoValues) => {
    const session = await getSession();
    const { dueDate, priority, ...rest } = values;
    const payload = {
      dueDate: values.dueDate === null ? undefined : values.dueDate,
      done: false,
      owner: "5f9a2b9a9d6b2b1b1c9d9c9d" || "",
      priority:
        enumValues.find(({ value }) => value === priority)?.enumValue ||
        Priority.LOW,
      _id: id || "",
      ...rest,
    } as ITask;
    try {
      await updateOne(payload, {
        id: "5f9a2b9a9d6b2b1b1c9d9c9d" || "",
      } as ISessionUser); //TODO - temporary solution
      submitCallback();
    } catch (error) {
      showMessage(
        `An error occured while updating the task: ${error}`,
        "error"
      );
    }
  };
  return isEdit ? edit : create;
};

export const useForm = (submitCallback: () => void, task?: ITask) => {
  const validationSchema = useValidationSchema();
  const isEdit = task !== undefined;
  const onSubmit = useOnSubmit(submitCallback, isEdit, task?._id);
  const initialValues = useInitialValues(task);
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

export const usePrioritySliderValues = (
  defaultValue?: Priority
): [
  Array<{ value: number; label: string; enumValue: Priority }>,
  number,
  (value: number) => string | undefined,
  (value: number) => string,
  number,
  number
] => {
  const prioritySliderValues = useMapPriorityValueToEnum();

  const defaultPrioritySliderValue = defaultValue
    ? prioritySliderValues.find((x) => x.enumValue === defaultValue)?.value ?? 1
    : 1;

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
