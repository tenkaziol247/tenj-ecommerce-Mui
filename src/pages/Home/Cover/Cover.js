import React from "react";

import "./Cover.scss";
import IntroCard from "./IntroCard/IntroCard";
import BannerCard from "./BannerCard/BannerCard";
import TenjCarousel from "../../../DIY/TenjCarousel/TenjCarousel";

export default function Cover(props) {
  const { coverLeftData, coverRightData } = props;

  let coverLeftRender = null;
  if (coverLeftData.length > 0) {
    coverLeftRender = coverLeftData.map((ele) => {
      return <IntroCard key={ele.id} item={ele} />;
    });
  }

  let coverRightRender = null;
  if (coverRightData.length > 0) {
    coverRightRender = coverRightData.map((ele) => {
      return <BannerCard key={ele.id} item={ele} />;
    });
  }

  return (
    <section className="cover">
      <div className="cover__left">
        <TenjCarousel hoverColor={"#fcb83b"}>{coverLeftRender}</TenjCarousel>
      </div>
      <div className="cover__right">{coverRightRender}</div>
    </section>
  );
}
