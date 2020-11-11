import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import "./Categories.scss";
import Category from "./Category/Category";

export default function Categories({ categoriesData, ...restProps }) {
  let categoriesRender = null;

  if (categoriesData.length > 0) {
    categoriesRender = categoriesData.map((item) => {
      return <Category key={item.id} item={item} />;
    });
  }

  return (
    <section className="categories">
      <h2 className="categories__title">Explore Categories</h2>
      <Grid container justify="space-between">
        {categoriesRender}
      </Grid>
    </section>
  );
}

Categories.propTypes = {
  categoriesData: PropTypes.array,
};
