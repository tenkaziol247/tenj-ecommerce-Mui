import React from "react";
import PropTypes from "prop-types";

import TenjCarousel from "../../../../DIY/TenjCarousel/TenjCarousel";
import MyTabPanel from "../../../../components/MyTabPanel/MyTabPanel";

const configResponsive = [
  { size: 992, itemsToShow: 4, itemsToScroll: 1, marginItem: 8 },
  { size: 768, itemsToShow: 3, itemsToScroll: 1, marginItem: 8 },
  { size: 576, itemsToShow: 2, itemsToScroll: 1, marginItem: 8 },
  { size: 400, itemsToShow: 2, itemsToScroll: 1, marginItem: 8 },
  { size: 0, itemsToShow: 1, itemsToScroll: 1, marginItem: 32 },
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

export default function TrendingPanel({
  value,
  index,
  children,
  ...restProps
}) {
  return (
    <MyTabPanel value={value} index={index} {...restProps}>
      <TenjCarousel
        responsive={configResponsive}
        customPrev={customBtnPrev}
        customNext={customBtnNext}
      >
        {children}
      </TenjCarousel>
    </MyTabPanel>
  );
}

TrendingPanel.propTypes = {
  value: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  children: PropTypes.node,
};
