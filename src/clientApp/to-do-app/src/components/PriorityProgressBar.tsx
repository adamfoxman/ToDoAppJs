import { Box, LinearProgress, Typography } from "@mui/material";
import { Priority } from "shared/types/enums";

interface PriorityProgressBarProps {
   priority: Priority;
}

const PriorityProgressBar = ({ priority }: PriorityProgressBarProps) => {
   const renderSwitch = () => {
      switch (priority) {
         case Priority.LOW:
            return (
               <>
                  <Typography variant="caption">Low</Typography>
                  <LinearProgress
                     variant="determinate"
                     value={25}
                     color="info"
                  />
               </>
            );
         case Priority.MEDIUM:
            return (
               <>
                  <Typography variant="caption">Medium</Typography>
                  <LinearProgress
                     variant="determinate"
                     value={50}
                     color="success"
                  />
               </>
            );
         case Priority.HIGH:
            return (
               <>
                  <Typography variant="caption">High</Typography>
                  <LinearProgress
                     variant="determinate"
                     value={75}
                     color="warning"
                  />
               </>
            );
         case Priority.VERY_HIGH:
            return (
               <>
                  <Typography variant="caption">Very High</Typography>
                  <LinearProgress
                     variant="determinate"
                     value={100}
                     color="error"
                  />
               </>
            );
         default:
            return null;
      }
   };

   return <Box sx={{ width: "100%" }}>{renderSwitch()}</Box>;
};

export default PriorityProgressBar;
