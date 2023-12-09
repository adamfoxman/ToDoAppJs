import { Button, IconButton, Toolbar, Typography, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { FunctionComponent } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { paths } from "config";
import { useAuth } from "shared/hooks/useAuth";

interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
   drawerWidth: number;
   toggleDrawer: () => void;
}

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

const ApplicationAppBar: FunctionComponent<AppBarProps> = (props) => {
   const { open, toggleDrawer } = props;
   const navigate = useNavigate();

   const routeChange = (path: string) => {
      navigate(path);
   };

   const { isAuthenticated, logout, tokenData } = useAuth();

   return (
      <AppBar position="absolute" {...props}>
         <Toolbar
            sx={{
               pr: "24px", // keep right padding when drawer closed
            }}
         >
            <IconButton
               edge="start"
               color="inherit"
               aria-label="open drawer"
               onClick={toggleDrawer}
               sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
               }}
            >
               <MenuIcon />
            </IconButton>
            <Typography
               component="h1"
               variant="h6"
               color="inherit"
               noWrap
               sx={{ flexGrow: 1 }}
            >
               ToDos
            </Typography>
            {isAuthenticated ? (
               <>
                  <Typography
                     variant="subtitle1"
                     sx={{ textTransform: "uppercase" }}
                  >
                     Hello {tokenData?.name} {"(" + tokenData?.email + ")"}
                  </Typography>
                  <Button onClick={logout} color="inherit">
                     Log out
                  </Button>
               </>
            ) : (
               <>
                  <Button
                     onClick={() => routeChange(paths.auth.login)}
                     color="inherit"
                  >
                     Sign In
                  </Button>
                  <Typography
                     variant="subtitle1"
                     sx={{ textTransform: "uppercase" }}
                  >
                     or
                  </Typography>
                  <Button
                     onClick={() => routeChange(paths.auth.register)}
                     color="inherit"
                  >
                     Sign Up
                  </Button>
               </>
            )}
         </Toolbar>
      </AppBar>
   );
};

export default ApplicationAppBar;
