import React from "react";
import { Drawer } from "@material-ui/core";
import SearchBar from "../../UI/SearchBar/SearchBar";
import PropTypes from "prop-types";

import "./SideDrawer.scss";
import NavigationBar from "../NavigationBar/NavigationBar";

export default function SideDrawer(props) {
  return (
    <Drawer
      anchor="left"
      open={props.showDrawer}
      onClose={props.toggleDrawer(false)}
    >
      <div className="sideDrawer">
        <div className="sideDrawer__header">
          <SearchBar />
        </div>
        <div className="sideDrawer__body">
          <NavigationBar />
        </div>
        <div className="sideDrawer__social">
          <span>
            <a href="https://www.facebook.com">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.pinterest.com">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </span>
        </div>
      </div>
    </Drawer>
  );
}

SideDrawer.propTypes = {
  toggleDrawer: PropTypes.func,
};
