import { darken, lighten, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const getBackgroundColor = (color: string, mode: string) =>
   mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
   mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
   mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
   mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);

export const LateTaskClassName = "lateTask";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
   "& .lateTask": {
      backgroundColor: getBackgroundColor(
         theme.palette.error.main,
         theme.palette.mode
      ),
      "&:hover": {
         backgroundColor: getHoverBackgroundColor(
            theme.palette.error.main,
            theme.palette.mode
         ),
      },
      "&.Mui-selected": {
         backgroundColor: getSelectedBackgroundColor(
            theme.palette.error.main,
            theme.palette.mode
         ),
         "&:hover": {
            backgroundColor: getSelectedHoverBackgroundColor(
               theme.palette.error.main,
               theme.palette.mode
            ),
         },
      },
   },
})) as typeof DataGrid;

export default StyledDataGrid;
