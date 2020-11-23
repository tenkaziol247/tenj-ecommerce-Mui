import React from "react";
import TenjCarousel from "../../../DIY/TenjCarousel/TenjCarousel";

import "./ProductGallery.scss";

export default function ProductGallery(props) {
  const { product } = props;

  const customIndicatorImage = {
    image: [...product.image],
  };

  return (
    <div className="productGallery">
      <div className="productGallery__container">
        <TenjCarousel customIndicatorImage={customIndicatorImage}>
          {product.image.map((ele, index) => {
            return (
              <div className="productGallery__container__image" key={index}>
                <img src={ele} alt="productGallery__image" />
              </div>
            );
          })}
        </TenjCarousel>
      </div>
    </div>
  );
}
