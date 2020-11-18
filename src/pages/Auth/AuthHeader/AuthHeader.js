import React from "react";

import "./AuthHeader.scss";
import Logo from "../../../components/Image/Logo/Logo";

export default function AuthHeader(props) {
  return (
    <div className="authHeader">
      <div className="authHeader__logo">
        <Logo />
      </div>
    </div>
  );
}
