import { Button } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./Card.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    height: "100%",
    color: theme.palette.common.white,
    "&:hover": {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("xs")]: {
      color: theme.palette.primary.main,
    },
  },
  icon: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
  },
  btnHide: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function Card(props) {
  const { item } = props;
  const classes = useStyles();
  return (
    <div className="card">
      <div
        className="card__media"
        style={{
          height: `${props.mediaHeight ? props.mediaHeight : undefined}`,
        }}
      >
        <a href="/">
          <img
            src={item.image[0]}
            alt="image_product1"
            className="card__image1"
          />
          <img
            src={item.image[1]}
            alt="image_product2"
            className="card__image2"
          />
        </a>
        <div className="card__action">
          <div className="card__action__left">
            <Button
              fullWidth
              disableElevation
              className={`${classes.root} ${classes.btnHide}`}
            >
              <VisibilityIcon fontSize="small" className={classes.icon} />
            </Button>
          </div>
          <div className="card__action__right">
            <Button fullWidth disableElevation className={classes.root}>
              <AddShoppingCartIcon fontSize="small" className={classes.icon} />
            </Button>
          </div>
          <div className="card__action__seperate"></div>
        </div>
      </div>
      <div
        className="card__body"
        style={{
          height: `${props.bodyHeight ? props.bodyHeight : undefined}`,
        }}
      >
        <div className="card__categories">
          {item.category.map((catItem, index) => {
            return (
              <span key={index} className="card__category">
                {catItem}
              </span>
            );
          })}
        </div>
        <h5 className="card__title">{item.title}</h5>
        <div className="card__price">
          <span className="card__newPrice">${item.newPrice}</span>
          <span className="card__oldPrice">
            {item.oldPrice !== 0 ? "$" + item.oldPrice : null}
          </span>
        </div>
        <div className="card__feedback">
          <span className="card__rate">
            {[...Array(item.rate)].map((_, i) => {
              return (
                <span key={i} className="card__star__feedback">
                  <i className="fa fa-star"></i>
                </span>
              );
            })}
            {item.rate < 5
              ? [...Array(5 - item.rate)].map((_, i) => {
                  return (
                    <span key={i} className="card__star__empty">
                      <i className="fa fa-star"></i>
                    </span>
                  );
                })
              : null}
          </span>
          <span className="card__review">({item.review} Reviews)</span>
        </div>
      </div>
    </div>
  );
}
