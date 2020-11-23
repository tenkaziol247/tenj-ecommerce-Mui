import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./CartSummary.scss";
import * as actions from "../../../store/action";
import { useHistory } from "react-router-dom";

export default function CartSummary({ subTotal = 0, ...restProps }) {
  const [total, setTotal] = useState(0);

  const history = useHistory();

  const { currentUser } = useSelector((state) => state.auth);
  const { shippingType } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    setTotal(+subTotal);
  }, [subTotal]);

  useEffect(() => {
    switch (shippingType) {
      case "free":
        setTotal(+subTotal);
        break;
      case "standard":
        setTotal(+subTotal + 10);
        break;
      case "fastest":
        setTotal(+subTotal + 20);
        break;
      default:
        setTotal(+subTotal);
        break;
    }
  }, [shippingType, subTotal]);

  const shippingTypeCheckedHandler = (e) => {
    dispatch(actions.setShippingType(e.currentTarget.value));
  };

  const handleStartCheckout = () => {
    if (subTotal > 0) {
      if (currentUser) {
        history.push("/checkout");
      } else {
        dispatch(actions.setRedirectPath("/checkout"));
        history.push("/auth");
      }
    } else {
      alert("Please add item to cart");
    }
  };

  return (
    <div className="cartSummary">
      <h3 className="cartSummary__title">Cart Total</h3>
      <table>
        <tbody>
          <tr className="cartSummary__subtotal">
            <td>Subtotal:</td>
            <td>${subTotal || "0.00"}</td>
          </tr>
          <tr className="cartSummary__shipping">
            <td>Shipping:</td>
            <td></td>
          </tr>
          <tr className="cartSummary__shipping__item">
            <td>
              <input
                id="freeShipping"
                type="radio"
                name="shippingType"
                value="free"
                onChange={(e) => shippingTypeCheckedHandler(e)}
                checked={shippingType === "free"}
              />
              <label
                className="cartSummary__custom__label"
                htmlFor="freeShipping"
              >
                Free Shipping
              </label>
            </td>
            <td>$0.00</td>
          </tr>
          <tr className="cartSummary__shipping__item">
            <td>
              <input
                id="standardShipping"
                type="radio"
                name="shippingType"
                value="standard"
                onChange={(e) => shippingTypeCheckedHandler(e)}
                checked={shippingType === "standard"}
              />
              <label
                className="cartSummary__custom__label"
                htmlFor="standardShipping"
              >
                Standard Shipping
              </label>
            </td>
            <td>$10.00</td>
          </tr>
          <tr className="cartSummary__shipping__item">
            <td>
              <input
                id="fastestShipping"
                type="radio"
                name="shippingType"
                value="fastest"
                onChange={(e) => shippingTypeCheckedHandler(e)}
                checked={shippingType === "fastest"}
              />
              <label
                className="cartSummary__custom__label"
                htmlFor="fastestShipping"
              >
                Fastest Shipping
              </label>
            </td>
            <td>$20.00</td>
          </tr>
          <tr className="cartSummary__estimate">
            <td>
              <h4>Estimate for Your Country</h4>
            </td>
            <td></td>
          </tr>
          <tr className="cartSummary__total">
            <td>Total:</td>
            <td>${total || "0.00"}</td>
          </tr>
        </tbody>
      </table>
      <div className="cartSummary__checkout">
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          disableElevation
          onClick={handleStartCheckout}
        >
          PROCEED TO CHECKOUT
        </Button>
      </div>
    </div>
  );
}
