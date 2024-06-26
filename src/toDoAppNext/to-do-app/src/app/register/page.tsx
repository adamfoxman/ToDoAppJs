import { Divider, Typography } from "@mui/material";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

const Register = () => {
   return (
      <>
         <Typography variant="h3">Sign up</Typography>
         <Divider sx={{ marginY: 2 }} />
         <RegisterForm />
      </>
   );
};

export default Register;
