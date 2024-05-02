import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import { propertyOf } from "@/shared/utils";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { Priority } from "@/shared/types/enums";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import PriorityProgressBar from "@/components/PriorityProgressBar";
import { useAlertContext } from "@/shared/contexts/AlertContext";
import { useConfirmationDialog } from "@/shared/contexts/ConfirmationDialogContext";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import { ITask } from "@/shared/db/Task";
import {
  getAll,
  getOne,
  updateOne,
  deleteTask,
} from "@/shared/services/TasksService";
import { ISessionUser, UserRoles } from "@/shared/db/User";
import { getSession } from "@/shared/services/AuthService";

const useColumns = (
  toggleDone: (id: string) => void,
  deleteTask: (id: string) => void
) => {
  const _renderCell = useCallback(
    (params: GridRenderCellParams<ITask, string>) => {
      const { value, row } = params;
      return row.done ? <s>{value}</s> : value;
    },
    []
  );

  const showConfirmationDialog = useConfirmationDialog();
  const router = useRouter();

  return useMemo(
    (): GridColDef<ITask>[] => [
      {
        field: propertyOf<ITask>("done"),
        headerName: "Done",
        renderCell: ({ value }: GridRenderCellParams<ITask, boolean>) => {
          return value && <DoneIcon />;
        },
        type: "boolean",
        flex: 3,
        hideable: false,
      },
      {
        field: propertyOf<ITask>("title"),
        headerName: "Title",
        flex: 6,
        minWidth: 100,
        hideable: false,
        renderCell: _renderCell,
      },
      {
        field: propertyOf<ITask>("description"),
        headerName: "Description",
        flex: 12,
        renderCell: _renderCell,
      },
      {
        field: propertyOf<ITask>("dueDate"),
        headerName: "Due date",
        type: "dateTime",
        valueFormatter: ({ value }: GridValueFormatterParams<Date>) => {
          if (!value) return null;
          return (
            value &&
            `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`
          );
        },
        flex: 5,
      },
      {
        field: propertyOf<ITask>("priority"),
        headerName: "Priority",
        type: "singleSelect",
        valueOptions: Object.values(Priority),
        flex: 3,
        minWidth: 130,
        renderCell: ({ value }: GridRenderCellParams<ITask, Priority>) => {
          return value && <PriorityProgressBar priority={value} />;
        },
      },
      {
        field: "actions",
        type: "actions",
        flex: 5,
        minWidth: 100,
        hideable: false,
        getActions: (params: GridRowParams<ITask>) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            key="Delete"
            onClick={() => {
              showConfirmationDialog({
                message: "Are you sure you want to delete this task?",
                callback: () => {
                  deleteTask(params.row._id);
                },
                title: "Delete task",
              });
            }}
          />,
          params.row.done ? (
            <GridActionsCellItem
              icon={<CheckBoxIcon />}
              label="Undone"
              onClick={() => {
                toggleDone(params.row._id);
              }}
            />
          ) : (
            <GridActionsCellItem
              icon={<CheckBoxOutlineBlankIcon />}
              label="Mark as done"
              onClick={() => {
                toggleDone(params.row._id);
              }}
            />
          ),
          <GridActionsCellItem
            key="Edit"
            icon={<EditIcon />}
            label="Edit"
            disabled={params.row.done}
            onClick={() => {
              router.push(`/todos/edit/${params.row._id}`);
            }}
          />,
        ],
      },
    ],
    [_renderCell, deleteTask, router, showConfirmationDialog, toggleDone]
  );
};

export const useDataGrid = () => {
  const [todos, setTodos] = useState<ITask[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const getTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAll({
        id: "5f9a2b9a9d6b2b1b1c9d9c9d" || "",
        email: "",
        name: "string",
        role: UserRoles.Standard,
      }); //TODO temp mock user
      setTodos(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const showMessage = useAlertContext();
  const toggleDone = useCallback(
    async (id: string) => {
      try {
        const task = await getOne(id, {
          id: "5f9a2b9a9d6b2b1b1c9d9c9d",
        } as ISessionUser); //todo replace it with logged in user id
        if (!task) {
          showMessage("Task not found", "error");
          return;
        }

        const { done, _id, dueDate, ...restTask } = task;
        await updateOne(
          {
            _id: _id,
            done: !done,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            ...restTask,
          } as ITask,
          { id: "5f9a2b9a9d6b2b1b1c9d9c9d" } as ISessionUser //todo replace it with logged in user id
        );
      } catch (error) {
        showMessage("An error occurred during updating task status", "error");
      } finally {
        getTodos();
      }
    },
    [getTodos, showMessage]
  );

  const _deleteTask = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await deleteTask(
          id,
          { id: "5f9a2b9a9d6b2b1b1c9d9c9d" } as ISessionUser //todo replace it with logged in user id
        );
      } catch (error) {
        showMessage("An error occurred during deleting task", "error");
      } finally {
        getTodos();
      }
    },
    [getTodos, showMessage]
  );

  const columns = useColumns(toggleDone, _deleteTask);

  return { todos, loading, error, getTodos, columns };
};
