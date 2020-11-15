import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./NavItem.scss";

export default function NavItem(props) {
  return (
    <li className={[props.pClass, "navItem"].join(" ")}>
      <NavLink to={props.link} exact={props.exact} activeClassName="actived">
        {props.children}
      </NavLink>
    </li>
  );
}

NavItem.propTypes = {
  pClass: PropTypes.string,
  link: PropTypes.string,
};
