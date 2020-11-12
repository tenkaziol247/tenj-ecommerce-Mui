import React from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
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
        onChange={() => {}}
      />
    </div>
  );
}

QuantityHandler.propStyles = {
  subtractClickedHandler: PropTypes.func,
  addClickedHandler: PropTypes.func,
  quantity: PropTypes.any.isRequired,
};
