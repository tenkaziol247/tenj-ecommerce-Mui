import React from "react";
import BackgroundCover from "../../components/BackgroundCover/BackgroundCover";
import CartMain from "./CartMain/CartMain";

export default function Cart(props) {
  return (
    <>
      <BackgroundCover>
        <h2>Shopping Cart</h2>
        <p>TenJ</p>
      </BackgroundCover>
      <CartMain />
    </>
  );
}
