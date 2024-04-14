import { createContext, useCallback, useContext } from "react";

export type ConfirmationDialogContextProps = {
   message: string;
   setMessage: (message: string) => void;
   open: boolean;
   setOpen: (open: boolean) => void;
   onConfirm: () => void;
   setConfirmCallback: (callback: () => () => void) => void;
   onCancel: () => void;
   title: string;
   setTitle: (title: string) => void;
};

const ConfirmationDialogContext = createContext<ConfirmationDialogContextProps>(
   {
      message: "",
      setMessage: (message: string) => {},
      open: false,
      setOpen: (open: boolean) => {},
      onConfirm: () => {},
      onCancel: () => {},
      title: "",
      setTitle: (title: string) => {},
      setConfirmCallback: (callback: () => () => void) => {},
   }
);

export const useConfirmationDialog = () => {
   const { setTitle, setMessage, setOpen, setConfirmCallback } = useContext(
      ConfirmationDialogContext
   );
   const showDialog = useCallback(
      (dialogProps: {
         title: string;
         message: string;
         callback: () => void;
      }) => {
         setTitle(dialogProps.title);
         setMessage(dialogProps.message);
         setConfirmCallback(() => dialogProps.callback);
         setOpen(true);
      },
      [setConfirmCallback, setMessage, setOpen, setTitle]
   );
   return showDialog;
};

export default ConfirmationDialogContext;
