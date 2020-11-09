import React from "react";
import { Link } from "react-router-dom";

import "./NavItem.scss";

export default function NavItem(props) {
  return (
    <li className={[props.pClass, "navItem"].join(" ")}>
      <Link to={props.link} exact={props.exact}>
        {props.children}
      </Link>
    </li>
  );
}
