import React from "react";

import "./ProductListing.scss";
import Loader from "../../../components/Loader/Loader";
import Product from "./Product/Product";

export default function ProductListing(props) {
  const { products, loading, girdColumn } = props;

  let productsRender = null;
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

  return (
    <div className="productListing">
      {!loading ? productsRender : <Loader />}
    </div>
  );
}
