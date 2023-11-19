import { HTMLAttributes } from "react";
import { Container } from "./Loader.style";
import { CircularProgress, Typography } from "@mui/material";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
   label?: string;
   size?: number;
}

const Loader = ({ label, size = 100, ...props }: LoaderProps) => (
   <Container {...props}>
      <CircularProgress size={size} />
      <Typography variant="subtitle1" color="textPrimary">
         {label}
      </Typography>
   </Container>
);

export default Loader;
