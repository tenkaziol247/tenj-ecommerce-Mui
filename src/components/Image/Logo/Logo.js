import React from "react";
import { Link } from "react-router-dom";

import logoImage from "../../../assets/images/logo.png";
import "./Logo.scss";

export default function Logo(props) {
  return (
    <div className="logo">
      <Link to="/" exact="true">
        <img src={logoImage} alt="logo" />
      </Link>
    </div>
  );
}
