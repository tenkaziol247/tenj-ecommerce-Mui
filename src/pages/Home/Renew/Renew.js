import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import "./Renew.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    borderRadius: "24px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      padding: "6px 12px",
    },
  },
}));

export default function Renew(props) {
  const classes = useStyles();
  let history = useHistory();

  const renewClickedHandler = () => {
    history.push("/list");
  };

  return (
    <section className="renew">
      <div className="renew__container">
        <div className="renew__title">
          <h5 className="renew__title__intro">New Deals</h5>
          <h5 className="renew__title__main">Start Daily at 12pm e.t.</h5>
        </div>
        <div className="renew__content">
          <div className="renew__content__text">
            <p>
              Get <span>FREE SHIPPING &amp; 5% rewards</span> on every order
              with Tenj technology shop rewards program
            </p>
          </div>
          <div className="renew__content__action">
            <Button
              onClick={renewClickedHandler}
              variant="contained"
              color="primary"
              disableElevation
              className={classes.root}
              size="large"
            >
              Add to Cart for $50.00/year
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
