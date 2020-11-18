import React, { Suspense, useEffect } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { useDispatch, useSelector } from "react-redux";

import Loader from "./components/Loader/Loader";
import routes from "./pages/routes";
import * as actions from "./store/action";
import { auth } from "./firebase";
import PublicRoute from "./HOC/PublicRoute/PublicRoute";
import PrivateRoute from "./HOC/PrivateRoute/PrivateRoute";

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
  const { loading } = useSelector((state) => {
    return state.products;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchProducts());

    const unSubcribe = auth.onAuthStateChanged((user) => {
      dispatch(actions.onAuthStateChanged(user));
    });

    return unSubcribe;
  }, [dispatch]);

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
        {loading ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map(
                ({ component: Component, path, routePublic, ...restProps }) => {
                  if (routePublic) {
                    return (
                      <PublicRoute
                        key={path}
                        path={path}
                        {...restProps}
                        component={Component}
                      />
                    );
                  } else {
                    return (
                      <PrivateRoute
                        key={path}
                        path={path}
                        {...restProps}
                        component={Component}
                      />
                    );
                  }
                }
              )}
              <Redirect to="/" />
            </Switch>
          </Suspense>
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
