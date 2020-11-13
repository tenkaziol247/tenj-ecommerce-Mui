import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import "./Deals.scss";
import Deal from "./Deal/Deal";

export default function Deals({ dealsData, ...restProps }) {
  let dealsDataRender = null;
  if (dealsData.length > 0) {
    dealsDataRender = dealsData.map((ele) => {
      return <Deal key={ele.id} item={ele} />;
    });
  }

  return (
    <section className="deals">
      <div className="deals__title">
        <h2>Deals &amp; Outlet</h2>
        <p>Today's deal and more</p>
      </div>
      <div className="deals__container">{dealsDataRender}</div>
      <div className="deals__button">
        <Button
          disableElevation
          variant="outlined"
          color="secondary"
          component={Link}
          to="/list"
          size="small"
          endIcon={<ArrowRightIcon />}
        >
          Shop More Outlet Deals
        </Button>
      </div>
    </section>
  );
}
