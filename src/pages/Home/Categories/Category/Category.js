import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./Category.scss";

export default function Category(props) {
  return (
    <Grid item xs={6} sm={4} lg={2} className="caterogy">
      <Link to={props.item.toPath}>
        <div className="category__media">
          <span className="category__img">
            <img src={props.item.image} alt="category_img" />
          </span>
        </div>
        <p className="category__title">{props.item.title}</p>
      </Link>
    </Grid>
  );
}

Category.propTypes = {
  item: PropTypes.object,
};
