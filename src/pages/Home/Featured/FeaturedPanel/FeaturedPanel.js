import React from "react";
import PropTypes from "prop-types";

// import "./FeaturedPanel.scss";
import TenjCarousel from "../../../../DIY/TenjCarousel/TenjCarousel";

const configResponsive = [
  { size: 992, items: 4, marginItem: 8 },
  { size: 768, items: 3, marginItem: 8 },
  { size: 576, items: 2, marginItem: 8 },
  { size: 400, items: 2, marginItem: 8 },
  { size: 0, items: 1, marginItem: 32 },
];

const customBtnNext = {
  backgroundColor: "rgba(238, 238, 238, 0.4)",
  padding: "8px",
  transition: "none",
  boxShadow: "-3px 0 5px rgba(0,0,0,0.1)",
  right: "0",
};

const customBtnPrev = {
  backgroundColor: "rgba(238, 238, 238, 0.4)",
  padding: "8px",
  transition: "none",
  boxShadow: "3px 0 5px rgba(0,0,0,0.1)",
  left: "0",
};

export default function FeaturedPanel({
  value,
  index,
  children,
  ...restProps
}) {
  return (
    <div
      className="featuredPanel"
      id={`featured-panel-${index}`}
      hidden={value !== index}
      {...restProps}
    >
      {value === index && (
        <TenjCarousel
          responsive={configResponsive}
          customPrev={customBtnPrev}
          customNext={customBtnNext}
        >
          {children}
        </TenjCarousel>
      )}
    </div>
  );
}

FeaturedPanel.propTypes = {
  value: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  children: PropTypes.node,
};
