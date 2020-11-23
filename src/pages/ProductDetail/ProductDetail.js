import { Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Loader from "../../components/Loader/Loader";
import ProductGallery from "./ProductGallery/ProductGallery";
import ProductAction from "./ProductAction/ProductAction";
import ProductTab from "./ProductTab/ProductTab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "1200px",
    margin: "30px auto 60px",
    padding: "0 8px",
  },
  paper: {
    borderRadius: 0,
    boxShadow: "none",
  },
}));

export default function ProductDetail(props) {
  const classes = useStyles();
  const [productIndex, setProductIndex] = useState(-2);

  const { productsStore } = useSelector((state) => state.products);

  const { productId } = useParams();

  useEffect(() => {
    const productInd = productsStore.findIndex((ele) => ele.id === productId);
    setProductIndex(productInd);
  }, [productId, productsStore]);

  let productDetailRender = <Loader />;

  if (productIndex !== -2) {
    productDetailRender = (
      <>
        {productIndex !== -1 ? (
          <Grid className={classes.root} container spacing={0}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <ProductGallery product={productsStore[productIndex]} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <ProductAction product={productsStore[productIndex]} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ProductTab product={productsStore[productIndex]} />
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Redirect to="/list" />
        )}
      </>
    );
  }

  return productDetailRender;
}
