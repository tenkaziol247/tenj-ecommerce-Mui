import React from "react";

import BackgroundCover from "../../components/BackgroundCover/BackgroundCover";
import CheckoutMain from "./CheckoutMain.js/CheckoutMain";

export default function Checkout(props) {
  return (
    <>
      <BackgroundCover>
        <h2>Checkout</h2>
        <p>TenJ</p>
      </BackgroundCover>
      <CheckoutMain />
    </>
  );
}
