import React from "react";
import { Drawer } from "@material-ui/core";
import SearchBar from "../../UI/SearchBar/SearchBar";

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
      </div>
    </Drawer>
  );
}
