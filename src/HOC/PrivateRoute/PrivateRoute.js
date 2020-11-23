import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function PrivateRoute({
  component: Component,
  template,
  ...restProps
}) {
  const { currentUser } = useSelector((state) => state.auth);
  let routeRender = (
    <Route
      {...restProps}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
  if (template === "fullTemplate") {
    routeRender = (
      <Route
        {...restProps}
        render={(props) =>
          currentUser ? (
            <>
              <Header />
              <Component {...props} />
              <Footer />
            </>
          ) : (
            <Redirect to="/auth" />
          )
        }
      />
    );
  }
  return routeRender;
}
