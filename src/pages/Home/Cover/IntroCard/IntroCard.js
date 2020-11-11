import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import PropTypes from "prop-types";

import "./IntroCard.scss";

const useStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    borderRadius: "24px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.62rem",
      padding: "4px 12px",
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
            endIcon={<ArrowRightAltIcon />}
          >
            Click here
          </Button>
        </div>
      </div>
    </div>
  );
}

IntroCard.propTypes = {
  item: PropTypes.object,
};
