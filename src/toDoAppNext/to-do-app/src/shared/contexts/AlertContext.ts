import { AlertColor } from "@mui/material";
import { createContext, useContext } from "react";

export type AlertContextProps = {
   message: string;
   setMessage: (message: string) => void;
   type: AlertColor;
   setType: (type: AlertColor) => void;
   open: boolean;
   setOpen: (open: boolean) => void;
};

const AlertContext = createContext<AlertContextProps>({
   message: "",
   setMessage: (message: string) => {},
   type: "success",
   setType: (type: AlertColor) => {},
   open: false,
   setOpen: (open: boolean) => {},
});

export const useAlertContext = () => {
   const { setMessage, setOpen, setType } = useContext(AlertContext);
   return (message: string, type: AlertColor) => {
      setMessage(message);
      setOpen(true);
      setType(type);
   };
};

export default AlertContext;
