import { IconButton } from "@material-ui/core";
import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { Link } from "react-router-dom";

import "./CartList.scss";
import QuantityHandler from "../../../components/QuantityHandler/QuantityHandler";

export default function CartList(props) {
  let cartListRender = (
    <tr>
      <td
        style={{
          fontWeight: "500",
          fontSize: "1.2rem",
        }}
      >
        No Products in Cart
        <IconButton
          component={Link}
          to="/list"
          color="primary"
          size="small"
          style={{ marginLeft: "8px" }}
        >
          <RotateLeftIcon />
        </IconButton>
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
  if (props.cartStore.length > 0) {
    cartListRender = props.cartStore.map((ele) => {
      return (
        <tr key={ele.id}>
          <td>
            <Link to={`/product/${ele.id}`}>{ele.name}</Link>
          </td>
          <td>${(+ele.price).toFixed(2)}</td>
          <td>
            <div className="cartList__quantityHandler">
              <QuantityHandler
                subtractClickedHandler={() => props.subtractClickedHandler(ele)}
                addClickedHandler={() => props.addClickedHandler(ele)}
                quantity={ele.quantity}
                handleBlurInput={() => {}}
                handleQuantityInput={() => {}}
              />
            </div>
          </td>
          <td>${(ele.price * ele.quantity).toFixed(2)}</td>
          <td>
            <IconButton
              size="small"
              color="secondary"
              onClick={() => props.onRemoveProductToCart(ele.id)}
            >
              <CancelIcon />
            </IconButton>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="cartList">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{cartListRender}</tbody>
      </table>
    </div>
  );
}
