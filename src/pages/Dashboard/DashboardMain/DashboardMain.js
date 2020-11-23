import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import {
  ExpandMore,
  ExpandLess,
  AccountCircle,
  Home,
  ViewList,
  ExitToApp,
  Warning,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./DashboardMain.scss";
import MyTabPanel from "../../../components/MyTabPanel/MyTabPanel";
import InfoAccount from "../InfoAccount/InfoAccount";
import Loader from "../../../components/Loader/Loader";
import OrderList from "../OrderList/OrderList";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  cusListItem: {
    "&.Mui-disabled": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      opacity: 1,
    },
  },
  cusGridItem: {
    marginTop: "32px",
  },
  cusPaper: {
    boxShadow: "none",
    backgroundColor: theme.palette.grey[100],
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      padding: "12px",
    },
  },
}));

export default function DashboardMain(props) {
  const classes = useStyles();

  const [toggle, setToggle] = useState(true);
  const [value, setValue] = useState(0);

  const { currentUser } = useSelector((state) => state.auth);

  let query = new URLSearchParams(useLocation().search).get("tab");

  useEffect(() => {
    if (query && query === "order") {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [query]);

  const history = useHistory();

  const handleSignoutClick = () => {
    history.replace("/logout");
  };

  const handleListItemClick = (index) => {
    setValue(index);
  };

  let titleRender = null;
  if (value === 0) {
    titleRender = "Account Infomation";
  } else if (value === 1) {
    titleRender = "Address";
  } else if (value === 2) {
    titleRender = "Orders";
  }

  return (
    <section className="dashboardMain">
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} lg={3} className={classes.cusGridItem}>
          <ListItem selected button onClick={() => setToggle((prev) => !prev)}>
            <ListItemText>Menu</ListItemText>
            {toggle ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
          <Collapse in={toggle} timeout="auto" unmountOnExit>
            <List style={{ paddingTop: 0 }}>
              <ListItem
                className={classes.cusListItem}
                divider
                button
                onClick={() => handleListItemClick(0)}
                disabled={value === 0}
              >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText>Account Information</ListItemText>
              </ListItem>
              <ListItem
                className={classes.cusListItem}
                divider
                button
                onClick={() => handleListItemClick(1)}
                disabled={value === 1}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText>Address</ListItemText>
              </ListItem>
              <ListItem
                className={classes.cusListItem}
                divider
                button
                onClick={() => handleListItemClick(2)}
                disabled={value === 2}
              >
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText>Orders</ListItemText>
              </ListItem>
              <ListItem divider button onClick={() => handleSignoutClick()}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </Grid>
        <Grid item xs={12} lg={9}>
          <div className="dashboardMain__title">{titleRender}</div>
          <Paper className={classes.cusPaper}>
            <MyTabPanel value={value} index={0}>
              {currentUser ? (
                <InfoAccount currentUser={currentUser} />
              ) : (
                <Loader />
              )}
            </MyTabPanel>
            <MyTabPanel value={value} index={1}>
              <div>
                <Warning color="primary" />
              </div>
            </MyTabPanel>
            <MyTabPanel value={value} index={2}>
              <OrderList />
            </MyTabPanel>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
}
