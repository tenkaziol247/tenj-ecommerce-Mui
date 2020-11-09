import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.scss";

export default function NavigationItem(props) {
  return (
    <li className={[props.pClass, "navigationItem"].join(" ")}>
      <NavLink to={props.link} exact={props.exact} activeClassName="active">
        {props.children}
      </NavLink>
    </li>
  );
}
