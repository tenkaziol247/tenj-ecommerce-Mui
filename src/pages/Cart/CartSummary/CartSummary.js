import { Button } from "@material-ui/core";
import React, { useRef, useState, useEffect } from "react";

import "./CartSummary.scss";

export default function CartSummary(props) {
  const { subTotal } = props;

  const firstInputRef = useRef(null);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(subTotal);
    firstInputRef.current.checked = true;
  }, [subTotal]);

  const shippingTypeCheckedHandler = (e) => {
    e.currentTarget.checked = true;
    setTotal(+subTotal + +e.currentTarget.value);
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
                ref={firstInputRef}
                id="freeShipping"
                type="radio"
                name="shippingType"
                value="0"
                onChange={(e) => shippingTypeCheckedHandler(e)}
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
                value="10"
                onChange={(e) => shippingTypeCheckedHandler(e)}
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
                value="20"
                onChange={(e) => shippingTypeCheckedHandler(e)}
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
              <a href="/">Change address</a>
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
        >
          PROCEED TO CHECKOUT
        </Button>
      </div>
    </div>
  );
}
