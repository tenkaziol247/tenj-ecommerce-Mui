import React from "react";

import "./NavigationItems.scss";
import NavigationItem from "./NavigationItem/NavigationItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navigationHideItem: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function NavigationItems(props) {
  const classes = useStyles();
  return (
    <ul className="navigationItems">
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
      <NavigationItem link="/list" exact>
        Products
      </NavigationItem>
      <NavigationItem
        link="/dashboard?tab=order"
        exact
        pClass={classes.navigationHideItem}
      >
        Order
      </NavigationItem>
    </ul>
  );
}
