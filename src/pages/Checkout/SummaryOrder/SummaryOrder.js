import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./SummaryOrder.scss";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";

export default function SummaryOrder(props) {
  const { cartStore, shippingType } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartStore
      .reduce((sum, ele) => {
        return (sum += ele.price * ele.quantity);
      }, 0)
      .toFixed(2);
    setSubTotal(newTotal);
  }, [cartStore]);

  let productRender = <Loader />;
  if (cartStore.length > 0) {
    productRender = cartStore.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>
            <span className="summaryOrder__quantity">{item.quantity}x</span>{" "}
            <Link to={`/product/${item.id}`}>{item.name}</Link>
          </td>
          <td>${item.price * item.quantity}</td>
        </tr>
      );
    });
  }

  return (
    <div className="summaryOrder">
      <h3 className="summaryOrder__title">Your Order</h3>
      <table>
        <thead>
          <tr className="summaryOrder__header">
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productRender}
          <tr className="summaryOrder__subTotal">
            <td>Subtotal:</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping type:</td>
            <td>{shippingType}</td>
          </tr>
          <tr className="summaryOrder__total">
            <td>Total:</td>
            <td>
              $
              {shippingType === "free"
                ? subTotal
                : shippingType === "standard"
                ? +subTotal + 10
                : +subTotal + 20}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
