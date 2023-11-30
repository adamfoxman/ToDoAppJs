import {
   Alert,
   AlertColor,
   Box,
   Container,
   Paper,
   Snackbar,
   Toolbar,
} from "@mui/material";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import AppBar from "components/AppBar/AppBar";
import Drawer from "components/Drawer/Drawer";
import AlertContext, { AlertContextProps } from "shared/contexts/AlertContext";

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

   const alertContextProps: AlertContextProps = {
      open: snackbarOpen,
      setOpen: setSnackbarOpen,
      message: snackbarMessage,
      setMessage: setSnackbarMessage,
      type: snackbarType,
      setType: setSnackbarType,
   };

   return (
      <AlertContext.Provider value={alertContextProps}>
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
         </Box>
      </AlertContext.Provider>
   );
};

export default Layout;
