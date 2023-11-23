import {
   Divider,
   IconButton,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Toolbar,
   styled,
} from "@mui/material";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { FunctionComponent } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { paths } from "config";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

export interface DrawerProps extends MuiDrawerProps {
   open?: boolean;
   drawerWidth: number;
   toggleDrawer: () => void;
}

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open, drawerWidth }) => ({
   "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
         overflowX: "hidden",
         transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         width: theme.spacing(7),
         [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
         },
      }),
   },
}));

const AppDrawer: FunctionComponent<DrawerProps> = (props) => {
   const { toggleDrawer } = props;
   return (
      <Drawer variant="permanent" {...props}>
         <Toolbar
            sx={{
               display: "flex",
               alignItems: "center",
               justifyContent: "flex-end",
               px: [1],
            }}
         >
            <IconButton onClick={toggleDrawer}>
               <ChevronLeftIcon />
            </IconButton>
         </Toolbar>
         <Divider />
         <List component="nav">
            <ListItemButton component={Link} to={paths.main}>
               <ListItemIcon>
                  <DashboardIcon />
               </ListItemIcon>
               <ListItemText primary="Main Page" />
            </ListItemButton>
            <ListItemButton component={Link} to={paths.todos.main}>
               <ListItemIcon>
                  <TaskOutlinedIcon />
               </ListItemIcon>
               <ListItemText primary="Todos" />
            </ListItemButton>
         </List>
      </Drawer>
   );
};

export default AppDrawer;
