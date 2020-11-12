import React, { useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "./QuickView.scss";
import Loader from "../Loader/Loader";
import QuantityHandler from "../QuantityHandler/QuantityHandler";
import TenjCarousel from "../../DIY/TenjCarousel/TenjCarousel";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
}));

export default function QuickView(props) {
  const classes = useStyles();
  const { item } = props;
  const [itemDispatch, setItemDispatch] = useState({
    id: "",
    price: 0,
    name: "",
    quantity: 1,
  });

  const subtractClickedHandler = () => {
    if (itemDispatch.quantity > 1) {
      setItemDispatch((prev) => {
        return { ...prev, quantity: (prev.quantity -= 1) };
      });
    }
  };

  const addClickedHandler = () => {
    setItemDispatch((prev) => {
      return { ...prev, quantity: (prev.quantity += 1) };
    });
  };

  let customIndicatorImage = null;
  if (item !== null) {
    customIndicatorImage = {
      image: [...item.image],
    };
  }

  let quickViewRender = <Loader />;
  if (item !== null) {
    quickViewRender = (
      <div className="quickView">
        <div className="quickView__left">
          <div className="quickView__left__container">
            <TenjCarousel customIndicatorImage={customIndicatorImage}>
              {item.image.map((ele, index) => {
                return (
                  <div
                    className="quickView__left__container__image"
                    key={index}
                  >
                    <img src={ele} alt="quickView__image" />
                  </div>
                );
              })}
            </TenjCarousel>
          </div>
        </div>
        <div className="quickView__right">
          <div className="quickView__right__above">
            <h3 className="quickView__right__name">{item.title}</h3>
            <div className="quickView__right__feedback">
              <span className="quickView__right__rate">
                {[...Array(item.rate)].map((_, i) => {
                  return (
                    <span key={i} className="quickView__right__rate__full">
                      <i className="fa fa-star"></i>
                    </span>
                  );
                })}
                {item.rate < 5
                  ? [...Array(5 - item.rate)].map((_, i) => {
                      return (
                        <span key={i} className="quickView__right__rate__empty">
                          <i className="fa fa-star"></i>
                        </span>
                      );
                    })
                  : null}
              </span>
              <span className="quickView__right__review">
                ({item.review} Reviews)
              </span>
            </div>
            <div className="quickView__right__price">
              <span className="quickView__right__newPrice">
                ${item.newPrice}
              </span>
              <span className="quickView__right__oldPrice">
                {item.oldPrice !== 0 ? "$" + item.oldPrice : null}
              </span>
            </div>
            <div className="quickView__right__description">
              {item.description}
            </div>
            <div className="quickView__right__action">
              <div className="quickView__right__quantity">
                <span>QTY:</span>
                <QuantityHandler
                  subtractClickedHandler={subtractClickedHandler}
                  addClickedHandler={addClickedHandler}
                  quantity={itemDispatch.quantity}
                />
              </div>
              <div className="quickView__right__addToCart">
                <Button
                  onClick={() => {}}
                  startIcon={<AddShoppingCartIcon fontSize="small" />}
                  fullWidth
                  color="primary"
                  variant="outlined"
                  disableElevation
                  className={classes.root}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
          <div className="quickView__right__below">
            <p className="quickView__right__categories">
              <span className="quickView__right__categories__title">
                Category:
              </span>
              {item.category.map((catItem, index) => {
                return (
                  <span key={index} className="quickView__right__category">
                    {catItem}
                  </span>
                );
              })}
            </p>
            <p className="quickView__right__social">
              Share:
              <a href="https://www.facebook.com">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.pinterest.com">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return quickViewRender;
}
