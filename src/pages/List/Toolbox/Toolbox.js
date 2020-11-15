import React from "react";
import PropTypes from "prop-types";

import "./Toolbox.scss";

export default function Toolbox(props) {
  const {
    productsPerPageCurrent,
    totalProducts,
    sortBySelectedHandler,
    gridType,
    gridTypeClickedHandler,
  } = props;

  return (
    <div className="toolbox">
      <div className="toolbox__left">
        <p>
          Showing
          <span>
            {productsPerPageCurrent} of {totalProducts}
          </span>
          products
        </p>
      </div>
      <div className="toolbox__right">
        <div className="toolbox__sortBy">
          <p>Sort by:</p>
          <select name="sortBy" id="sortBy" onChange={sortBySelectedHandler}>
            <option value="default">Featured</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="mostReviews">Most Reviewed</option>
          </select>
        </div>
        <div className="toolbox__gridColumnType">
          <button
            className={[
              "toolbox__gridColumn__btn",
              gridType === 2 && "active",
            ].join(" ")}
            onClick={gridTypeClickedHandler}
            value="2"
          >
            <svg width="10" height="10">
              <rect x="0" y="0" width="4" height="4"></rect>
              <rect x="6" y="0" width="4" height="4"></rect>
              <rect x="0" y="6" width="4" height="4"></rect>
              <rect x="6" y="6" width="4" height="4"></rect>
            </svg>
          </button>
          <button
            className={[
              "toolbox__gridColumn__btn",
              gridType === 3 && "active",
            ].join(" ")}
            onClick={gridTypeClickedHandler}
            value="3"
          >
            <svg width="16" height="10">
              <rect x="0" y="0" width="4" height="4"></rect>
              <rect x="6" y="0" width="4" height="4"></rect>
              <rect x="12" y="0" width="4" height="4"></rect>
              <rect x="0" y="6" width="4" height="4"></rect>
              <rect x="6" y="6" width="4" height="4"></rect>
              <rect x="12" y="6" width="4" height="4"></rect>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

Toolbox.propTypes = {
  productsPerPageCurrent: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  sortBySelectedHandler: PropTypes.func,
  gridType: PropTypes.number.isRequired,
  gridTypeClickedHandler: PropTypes.func,
};
