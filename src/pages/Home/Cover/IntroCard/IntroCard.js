import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import "./IntroCard.scss";

const useStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    borderRadius: "24px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.65rem",
      padding: "4px 8px",
    },
  },
}));

export default function IntroCard(props) {
  const { item } = props;
  const classes = useStyle();
  return (
    <div className="introCard">
      <img src={item.image} alt={item.subtitle} />
      <div className="introCard__content">
        <p className="introCard__subtitle">{item.subtitle}</p>
        <p className="introCard__title">{item.title}</p>
        <span className="introCard__oldPrice">${item.oldprice}</span>
        <span className="introCard__newPrice">${item.currentprice}</span>
        <div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            component={Link}
            to="/list"
            className={classes.root}
          >
            Click here
          </Button>
        </div>
      </div>
    </div>
  );
}
