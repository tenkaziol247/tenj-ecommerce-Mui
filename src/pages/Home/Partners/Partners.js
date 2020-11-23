import React from "react";
import TenjCarousel from "../../../DIY/TenjCarousel/TenjCarousel";

import "./Partners.scss";

export default function Partners({ partnersData, ...restProps }) {
  const responsiveConfig = [
    { size: 768, itemsToShow: 6, itemsToScroll: 6, marginItem: 0 },
    { size: 576, itemsToShow: 3, itemsToScroll: 3, marginItem: 0 },
    { size: 0, itemsToShow: 2, itemsToScroll: 2, marginItem: 0 },
  ];

  let partnersRender = null;
  if (partnersData.length > 0) {
    partnersRender = partnersData.map((ele) => {
      return (
        <div className="partners__item" key={ele.id}>
          <div className="partners__img">
            <img src={ele.image} alt="partner" />
          </div>
        </div>
      );
    });
  }
  return (
    <section className="partners">
      <TenjCarousel
        responsive={responsiveConfig}
        showIndicator
        autoPlay
        autoplayHoverPause
      >
        {partnersRender}
      </TenjCarousel>
    </section>
  );
}
