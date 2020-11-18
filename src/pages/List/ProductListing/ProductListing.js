import React from "react";

import "./ProductListing.scss";
import Product from "./Product/Product";
import Loader from "../../../components/Loader/Loader";

export default function ProductListing(props) {
  const { products, girdColumn } = props;

  let productsRender = <Loader />;
  if (products.length > 0) {
    productsRender = products.map((ele) => {
      return (
        <div
          className="productListing__item"
          key={ele.id}
          style={{ width: `calc(100% / ${girdColumn}.0)` }}
        >
          <Product product={ele} handleShowModal={props.handleShowModal} />
        </div>
      );
    });
  }

  return <div className="productListing">{productsRender}</div>;
}
