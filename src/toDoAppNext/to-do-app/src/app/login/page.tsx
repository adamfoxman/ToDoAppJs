import { Divider, Grid, Typography } from "@mui/material";
import LoginForm from "@/components/LoginForm/LoginForm";
import { paths } from "@/config";
import { useEffect } from "react";
import { getSession } from "@/shared/services/AuthService";
import { redirect } from "next/navigation";
//import Auth from "shared/services/Auth";

const Login = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect(paths.main);
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Typography variant="h3" textAlign="center">
          Sign in
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default Login;
