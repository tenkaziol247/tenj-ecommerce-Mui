import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import FullTemplate from "./HOC/Template/FullTemplate/FullTemplate";
import Loader from "./components/Loader/Loader";
import routes from "./pages/routes";

// import Modal from "./component/UI/Modal/Modal";
// import QuickView from "./component/UI/Card/QuickView/QuickView";
// import * as actions from "./store/action/index";
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  palette: {
    primary: {
      light: "#ffd17b",
      main: "#fcb83b",
      dark: "#da8d00",
    },
    secondary: {
      light: "#eec0c0",
      main: "#e28985",
      dark: "#ec625a",
    },
    black: {
      light: "#48494b",
      main: "#333",
      dark: "#242424",
    },
  },
});

// const darkTheme = createMuiTheme({
//   palette: {
//     type: "dark",
//   },
// });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        iconVariant
        dense
      >
        <Suspense fallback={<Loader />}>
          <Switch>
            {routes.map(({ component: Component, path, template, ...rest }) => {
              switch (template) {
                case "fullTemplate":
                  return (
                    <FullTemplate
                      key={path}
                      path={path}
                      component={Component}
                      {...rest}
                    />
                  );
                default:
                  return (
                    <Route
                      key={path}
                      path={path}
                      component={Component}
                      {...rest}
                    />
                  );
              }
            })}
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
