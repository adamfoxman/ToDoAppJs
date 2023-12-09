import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "components/Layout/Layout";
import routes from "pages/routes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrivateRoute from "components/PrivateRoute";

const theme = createTheme();

const App = () => {
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Router>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <Layout>
                  <Routes>
                     {routes.map((route) =>
                        route.public ? (
                           <Route key={route.path} {...route} />
                        ) : (
                           <Route key={route.path} element={<PrivateRoute />}>
                              <Route {...route} />
                           </Route>
                        )
                     )}
                  </Routes>
               </Layout>
            </LocalizationProvider>
         </Router>
      </ThemeProvider>
   );
};

export default App;
