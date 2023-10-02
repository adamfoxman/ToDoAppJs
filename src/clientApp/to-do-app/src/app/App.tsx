import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "components/Layout/Layout";
import routes from "routes";

const theme = createTheme();

const App = () => {
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Router>
            <Layout>
               <Routes>
                  {routes.map((route) => (
                     <Route key={route.path} {...route} />
                  ))}
               </Routes>
            </Layout>
         </Router>
      </ThemeProvider>
   );
};

export default App;
