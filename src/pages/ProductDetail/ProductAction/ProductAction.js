import React, { useState } from "react";

import "./ProductAction.scss";
import QuantityHandler from "../../../components/QuantityHandler/QuantityHandler";
import { Button } from "@material-ui/core";
import ProductFooter from "../../../components/ProductFooter/ProductFooter";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/action";

export default function ProductAction(props) {
  const { product } = props;

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = () => {
    enqueueSnackbar("Item added to Cart!", {
      variant: "success",
      autoHideDuration: 2000,
    });
  };

  const subtractClickedHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addClickedHandler = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = (item, quantity) => {
    handleClickVariant();
    dispatch(actions.addToCart(item, quantity));
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

  return (
    <div className="productAction">
      <div className="productAction__container">
        <h2 className="productAction__name">{product.title}</h2>
        <div className="productAction__feedback">
          <span className="productAction__feedback__rate">
            {[...Array(product.rate)].map((_, index) => {
              return (
                <span className="yellow-star" key={index}>
                  <i className="fa fa-star"></i>
                </span>
              );
            })}
            {[...Array(5 - product.rate)].map((_, index) => {
              return (
                <span className="gray-star" key={index}>
                  <i className="fa fa-star"></i>
                </span>
              );
            })}
          </span>
          <span className="productAction__feedback__reviews">
            {`( ${product.review} reviews )`}
          </span>
        </div>
        <div className="productAction__price">
          <span className="productAction__newPrice">${product.newPrice}</span>{" "}
          <span className="productAction__oldPrice">${product.oldPrice}</span>
        </div>
        <div className="productAction__color">
          <div className="productAction__color__title">Color:</div>{" "}
          <div className="product-color-default selected"></div>
        </div>
        <div className="productAction__quantity">
          <span className="productAction__quantity__title">QTY: </span>{" "}
          <QuantityHandler
            quantity={quantity}
            subtractClickedHandler={subtractClickedHandler}
            addClickedHandler={addClickedHandler}
            handleQuantityInput={handleQuantityInput}
            handleBlurInput={handleBlurInput}
          />
        </div>
        <div className="productAction__addToCart">
          <Button
            onClick={() => handleAddToCart(product, quantity)}
            fullWidth
            variant="contained"
            color="primary"
          >
            Add to cart
          </Button>
        </div>
      </div>
      <ProductFooter item={product.category} />
    </div>
  );
}
