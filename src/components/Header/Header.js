import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Badge, Button, Fade, IconButton, Popper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import SearchBar from "../UI/SearchBar/SearchBar";
import NavItem from "./NavItem/NavItem";
import NavigationBar from "../Navigation/NavigationBar/NavigationBar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Logo from "../Image/Logo/Logo";
import "./Header.scss";
import { Link } from "react-router-dom";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = React.useState();

  const { currentUser } = useSelector((state) => state.auth);

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

  const { cartStore } = useSelector((state) => {
    return state.cart;
  });

  const toggleDrawer = (status) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setShowDrawer(status);
  };

  const handleDropdown = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <>
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
              {!currentUser ? (
                <NavItem link="/auth">
                  <small>Hello, Sign in</small>
                  <span>Account</span>
                </NavItem>
              ) : (
                <li className="header__toolbar__right__nav__item">
                  <p>
                    <small>Hello,</small>
                    <span title={currentUser.displayName}>
                      {currentUser.displayName}
                    </span>
                  </p>
                  <div>
                    <IconButton
                      size="small"
                      onClick={handleDropdown("bottom-end")}
                    >
                      <ArrowDropDownIcon fontSize="small" color="secondary" />
                    </IconButton>
                  </div>
                </li>
              )}
              <NavItem link="/dashboard?tab=order" pClass={classes.navItemHide}>
                <>
                  <small>Returns</small>
                  <span> &amp; Orders</span>
                </>
              </NavItem>
              <NavItem link="/cart">
                <Badge
                  badgeContent={cartStore.reduce((total, ele) => {
                    return (total += ele.quantity);
                  }, 0)}
                  color="primary"
                >
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
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ transitionProps }) => (
            <Fade {...transitionProps} timeout={300}>
              <div
                className="dropdown__container"
                style={{ opacity: 1, visibility: "visible" }}
              >
                <ul>
                  <li className="dropdown__profile">
                    <Link to="/dashboard">My Account</Link>
                  </li>
                  <li className="dropdown__logout">
                    <Link to="/logout">Log out</Link>
                  </li>
                </ul>
              </div>
            </Fade>
          )}
        </Popper>
      </header>
    </>
  );
}
