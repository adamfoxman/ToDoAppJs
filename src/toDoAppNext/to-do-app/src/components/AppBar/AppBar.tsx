import { Button, IconButton, Toolbar, Typography, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { FunctionComponent } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { paths } from "@/config";
import { useRouter } from "next/navigation";
import { getSession, logoutUser } from "@/shared/services/AuthService";
import { SessionData, defaultSession } from "@/lib/session";

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

  const router = useRouter();

  const routeChange = (path: string) => router.push(path);

  const sessionData: SessionData = defaultSession;

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
        {sessionData.isLoggedIn ? (
          <>
            <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
              Hello {sessionData.username}!
            </Typography>
            <Button onClick={logoutUser} color="inherit">
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
            <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
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
