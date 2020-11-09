import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import "./BannerCard.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "16px",
    fontSize: "0.8rem",
    color: theme.palette.common.white,
  },
}));

export default function BannerCard(props) {
  const { item } = props;
  const classes = useStyles();
  return (
    <div className="bannerCard">
      <img src={item.image} alt={item.title} />
      <div className="bannerCard__content">
        <p className="bannerCard__subtitle">{item.subtitle}</p>
        <p className="bannerCard__title">{item.title}</p>
      </div>
      <div className="bannerCard__overlay">
        <Button
          className={classes.root}
          color="primary"
          variant="contained"
          disableElevation
          component={Link}
          to="/list"
        >
          Shop now
        </Button>
      </div>
    </div>
  );
}
