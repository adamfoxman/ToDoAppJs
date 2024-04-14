"use client";

import Loader from "@/components/Loader/Loader";
import { Box } from "@mui/material";

const Loading = () => {
   return (
      <Box position="absolute" height="50%" zIndex="modal">
         <Loader />
      </Box>
   );
};

export default Loading;
