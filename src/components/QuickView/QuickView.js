import React, { useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

import "./QuickView.scss";
import * as actions from "../../store/action";
import Loader from "../Loader/Loader";
import QuantityHandler from "../QuantityHandler/QuantityHandler";
import TenjCarousel from "../../DIY/TenjCarousel/TenjCarousel";
import ProductFooter from "../ProductFooter/ProductFooter";

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
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = () => {
    enqueueSnackbar("Item added to Cart!", {
      variant: "success",
      autoHideDuration: 2000,
    });
  };

  const addToCart = (itemDispatch, quantityDispatch) => {
    handleClickVariant();
    dispatch(actions.addToCart(itemDispatch, quantityDispatch));
    setQuantity(1);
  };

  const handleQuantityInput = (e) => {
    const reg = /^[0-9\b]+$/;
    if (
      e.target.value === "" ||
      (reg.test(e.target.value) && e.target.value.length < 4)
    ) {
      setQuantity(Number(e.target.value));
    }
  };

  const handleBlurInput = (e) => {
    if (e.target.value <= 0) {
      setQuantity(1);
    }
  };

  const subtractClickedHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addClickedHandler = () => {
    setQuantity((prev) => prev + 1);
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
            <h3 className="quickView__right__name">
              <Link to={`/product/${item.id}`}>{item.title}</Link>
            </h3>
            <div className="quickView__right__feedback">
              <span className="quickView__right__rate">
                {[...Array(item.rate)].map((_, i) => {
                  return (
                    <span key={i} className="yellow-star">
                      <i className="fa fa-star"></i>
                    </span>
                  );
                })}
                {item.rate < 5
                  ? [...Array(5 - item.rate)].map((_, i) => {
                      return (
                        <span key={i} className="gray-star">
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
                  quantity={quantity}
                  handleQuantityInput={handleQuantityInput}
                  handleBlurInput={handleBlurInput}
                />
              </div>
              <div className="quickView__right__addToCart">
                <Button
                  onClick={() => addToCart(item, quantity)}
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
          <ProductFooter item={item.category} />
        </div>
      </div>
    );
  }

  return quickViewRender;
}
