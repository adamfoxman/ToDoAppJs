import { Backdrop, CircularProgress } from "@mui/material";

export interface LoaderProps {
   size?: number;
}

const Loader = ({ size = 100 }: LoaderProps) => (
   <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={true}>
      <CircularProgress size={size} />
   </Backdrop>
);

export default Loader;
