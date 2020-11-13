import React, { useEffect, useRef, useState } from "react";

import "./Header.scss";
import Logo from "../Image/Logo/Logo";
import MenuIcon from "@material-ui/icons/Menu";
import { Badge, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../UI/SearchBar/SearchBar";
import NavItem from "./NavItem/NavItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NavigationBar from "../Navigation/NavigationBar/NavigationBar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
    padding: "0px",
    minWidth: "28px",
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
  },
  header: {
    backgroundColor: theme.palette.black.dark,
  },
  navItemHide: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
export default function Header(props) {
  const classes = useStyles();
  const closeBtnRef = useRef(null);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    const handleResizeWindow = () => {
      if (
        document.documentElement.clientWidth >= 992 ||
        document.body.clientWidth >= 992
      ) {
        closeBtnRef.current.click();
      }
    };
    handleResizeWindow();
  }, []);

  const toggleDrawer = (status) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setShowDrawer(status);
  };

  return (
    <header className={["header", classes.header].join(" ")}>
      <div className="header__toolbar">
        <div className="header__toolbar__left">
          <Button
            size="small"
            color="primary"
            className={classes.root}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </Button>
          <button
            ref={closeBtnRef}
            style={{ display: "none" }}
            onClick={toggleDrawer(false)}
          >
            Close
          </button>
          <Logo />
        </div>
        <div className="header__toolbar__right">
          <div className="header__toolbar__right__search">
            <SearchBar />
          </div>
          <ul className="header__toolbar__right__nav">
            <NavItem link="/cart">
              <>
                <small>Hello, Sign in</small>
                <span> Account</span>
              </>
            </NavItem>
            <NavItem link="/cart" pClass={classes.navItemHide}>
              <>
                <small>Returns</small>
                <span> &amp; Orders</span>
              </>
            </NavItem>
            <NavItem link="/cart">
              <Badge badgeContent={1} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </NavItem>
          </ul>
        </div>
      </div>
      <div className="header__navigationBar">
        <NavigationBar />
      </div>
      <SideDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
    </header>
  );
}
