import React from "react";
import PropTypes from "prop-types";

import "./ProductFooter.scss";

export default function ProductFooter(props) {
  const { item } = props;

  return (
    <div className="productFooter">
      <p className="productFooter__categories">
        <span className="productFooter__categories__title">Category:</span>
        <span>
          {item.map((catItem, index) => {
            return (
              <span key={index} className="productFooter__category">
                {catItem}
              </span>
            );
          })}
        </span>
      </p>
      <div className="productFooter__social">
        <span className="productFooter__social__title">Share:</span>
        <span>
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
        </span>
      </div>
    </div>
  );
}

ProductFooter.propTypes = {
  item: PropTypes.array.isRequired,
};
