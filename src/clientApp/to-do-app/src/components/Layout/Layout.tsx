import {
   Alert,
   AlertColor,
   Box,
   Button,
   Container,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Paper,
   Snackbar,
   Toolbar,
   Typography,
} from "@mui/material";
import { FunctionComponent, PropsWithChildren, useMemo, useState } from "react";
import AppBar from "components/AppBar/AppBar";
import Drawer from "components/Drawer/Drawer";
import AlertContext, { AlertContextProps } from "shared/contexts/AlertContext";
import ConfirmationDialogContext, {
   ConfirmationDialogContextProps,
} from "shared/contexts/ConfirmationDialogContext";

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = ({
   children,
}: PropsWithChildren<LayoutProps>) => {
   const drawerWidth = 240;
   const [open, setOpen] = useState(false);
   const toggleDrawer = () => {
      setOpen(!open);
   };
   const [snackbarOpen, setSnackbarOpen] = useState(false);
   const [snackbarMessage, setSnackbarMessage] = useState("");
   const [snackbarType, setSnackbarType] = useState<AlertColor>("success");

   const [dialogTitle, setDialogTitle] = useState("");
   const [dialogContent, setDialogContent] = useState("");
   const [dialogOpen, setDialogOpen] = useState(false);
   const [confirmCallback, setConfirmCallback] = useState<() => void>(
      () => () => {}
   );

   const alertContextProps: AlertContextProps = {
      open: snackbarOpen,
      setOpen: setSnackbarOpen,
      message: snackbarMessage,
      setMessage: setSnackbarMessage,
      type: snackbarType,
      setType: setSnackbarType,
   };

   const ConfirmationDialogContextProps: ConfirmationDialogContextProps =
      useMemo(
         () => ({
            title: dialogTitle,
            setTitle: setDialogTitle,
            message: dialogContent,
            setMessage: setDialogContent,
            open: dialogOpen,
            setOpen: setDialogOpen,
            onConfirm: () => {
               setDialogOpen(false);
               confirmCallback();
            },
            setConfirmCallback: setConfirmCallback,
            onCancel: () => setDialogOpen(false),
         }),
         [confirmCallback, dialogContent, dialogOpen, dialogTitle]
      );

   return (
      <AlertContext.Provider value={alertContextProps}>
         <ConfirmationDialogContext.Provider
            value={ConfirmationDialogContextProps}
         >
            <Box sx={{ display: "flex" }}>
               <AppBar
                  open={open}
                  toggleDrawer={toggleDrawer}
                  drawerWidth={drawerWidth}
               />
               <Drawer
                  open={open}
                  toggleDrawer={toggleDrawer}
                  drawerWidth={drawerWidth}
               />
               <Box
                  component="main"
                  sx={{
                     backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                           ? theme.palette.grey[100]
                           : theme.palette.grey[900],
                     flexGrow: 1,
                     height: "100vh",
                     overflow: "auto",
                  }}
               >
                  <Toolbar />
                  <Container>
                     <Paper sx={{ padding: 2, marginTop: 2 }}>{children}</Paper>
                  </Container>
               </Box>
               <AlertContext.Consumer>
                  {(context) => (
                     <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        open={context.open}
                        autoHideDuration={6000}
                        onClose={() => context.setOpen(false)}
                     >
                        <Alert severity={context.type}>{context.message}</Alert>
                     </Snackbar>
                  )}
               </AlertContext.Consumer>
               <ConfirmationDialogContext.Consumer>
                  {(context) => (
                     <Dialog open={context.open} onClose={context.onCancel}>
                        <DialogTitle>{context.title}</DialogTitle>
                        <DialogContent dividers>
                           <Typography variant="body1">
                              {context.message}
                           </Typography>
                        </DialogContent>
                        <DialogActions>
                           <Button autoFocus onClick={context.onCancel}>
                              Cancel
                           </Button>
                           <Button onClick={context.onConfirm}>Ok</Button>
                        </DialogActions>
                     </Dialog>
                  )}
               </ConfirmationDialogContext.Consumer>
            </Box>
         </ConfirmationDialogContext.Provider>
      </AlertContext.Provider>
   );
};

export default Layout;
