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
  const { currentUser } = useSelector((state) => state.auth);
  let routeRender = (
    <Route
      {...restProps}
      render={(props) =>
        currentUser && special ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
  if (template === "fullTemplate") {
    routeRender = (
      <Route
        {...restProps}
        render={(props) =>
          currentUser && special ? (
            <Redirect to="/" />
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
