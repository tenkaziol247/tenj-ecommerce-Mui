import React from "react";
import PropTypes from "prop-types";

import "./QuantityHandler.scss";

export default function QuantityHandler(props) {
  return (
    <div className="quantityHandler">
      <button
        onClick={props.subtractClickedHandler}
        className="quantityHandler__subtract"
      >
        &#9472;
      </button>
      <button
        onClick={props.addClickedHandler}
        className="quantityHandler__add"
      >
        &#9547;
      </button>
      <input
        className="quantityHandler__input"
        value={props.quantity}
        onChange={props.handleQuantityInput}
        onBlur={props.handleBlurInput}
      />
    </div>
  );
}

QuantityHandler.propStyles = {
  handleBlurInput: PropTypes.func,
  handleQuantityInput: PropTypes.func,
  subtractClickedHandler: PropTypes.func,
  addClickedHandler: PropTypes.func,
  quantity: PropTypes.any.isRequired,
};
