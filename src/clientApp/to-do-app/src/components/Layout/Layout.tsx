import { Box, Container, Paper, Toolbar } from "@mui/material";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import AppBar from "components/AppBar/AppBar";
import Drawer from "components/Drawer/Drawer";

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = ({
   children,
}: PropsWithChildren<LayoutProps>) => {
   const drawerWidth = 240;
   const [open, setOpen] = useState(false);
   const toggleDrawer = () => {
      setOpen(!open);
   };
   return (
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
      </Box>
   );
};

export default Layout;
