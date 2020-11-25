import React from "react";

import "./NavigationItems.scss";
import NavigationItem from "./NavigationItem/NavigationItem";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

const useStyles = makeStyles((theme) => ({
  navigationHideItem: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  cusBox: {
    marginRight: "8px",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));

export default function NavigationItems(props) {
  const classes = useStyles();
  return (
    <ul className="navigationItems">
      <NavigationItem link="/" exact>
        <Box display="flex" alignItems="center">
          <Box className={classes.cusBox}>
            <HomeIcon />
          </Box>{" "}
          Home
        </Box>
      </NavigationItem>
      <NavigationItem link="/list" exact>
        <Box display="flex" alignItems="center">
          <Box className={classes.cusBox}>
            <ListAltIcon />
          </Box>{" "}
          Product List
        </Box>
      </NavigationItem>
      <NavigationItem link="/dashboard" exact>
        <Box display="flex" alignItems="center">
          <Box className={classes.cusBox}>
            <AccountBoxIcon />
          </Box>{" "}
          Dashboard
        </Box>
      </NavigationItem>
      <NavigationItem link="/cart" exact>
        <Box display="flex" alignItems="center">
          <Box className={classes.cusBox}>
            <ShoppingBasketIcon />
          </Box>{" "}
          Shopping Cart
        </Box>
      </NavigationItem>
      <NavigationItem
        link="/dashboard?tab=order"
        exact
        pClass={classes.navigationHideItem}
      >
        <Box display="flex" alignItems="center">
          <Box className={classes.cusBox}>
            <AssignmentTurnedInIcon />
          </Box>{" "}
          Order List
        </Box>
      </NavigationItem>
    </ul>
  );
}
