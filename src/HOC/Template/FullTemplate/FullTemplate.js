import React from "react";
import { Route } from "react-router-dom";
import Header from "../../../components/Header/Header";

export default function FullTempalte({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Header />
            <Component {...props} />
            {/* //footer */}
          </>
        );
      }}
    />
  );
}
