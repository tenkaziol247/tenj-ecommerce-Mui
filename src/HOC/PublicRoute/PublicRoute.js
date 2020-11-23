import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function PublicRoute({
  component: Component,
  special,
  template,
  ...restProps
}) {
  const { currentUser, redirectPath } = useSelector((state) => state.auth);
  let routeRender = (
    <Route
      {...restProps}
      render={(props) =>
        currentUser && special ? (
          <Redirect to={redirectPath} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
  if (template === "fullTemplate") {
    routeRender = (
      <Route
        {...restProps}
        render={(props) =>
          currentUser && special ? (
            <Redirect to={redirectPath} />
          ) : (
            <>
              <Header />
              <Component {...props} />
              <Footer />
            </>
          )
        }
      />
    );
  }
  return routeRender;
}
