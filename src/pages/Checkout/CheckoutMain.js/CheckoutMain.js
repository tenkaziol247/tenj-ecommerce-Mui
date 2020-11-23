import { Box, Button, Grid, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";

import "./CheckoutMain.scss";
import SummaryOrder from "../SummaryOrder/SummaryOrder";
import ContactData from "../ContactData/ContactData";
import * as actions from "../../../store/action";

const useStyles = makeStyles((theme) => ({
  cusGrid: {
    flexGrow: 1,
  },
  cusPaper: {
    boxShadow: "none",
    borderRadius: 0,
  },
}));

export default function CheckoutMain(props) {
  const { successStatus } = useSelector((state) => state.order);
  const { cartStore } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      successStatus && dispatch(actions.resetSuccessStatus());
    };
  }, [dispatch, successStatus]);

  const classes = useStyles();
  return (
    <section className="checkoutMain">
      <Grid container className={classes.cusGrid}>
        {successStatus ? (
          <Grid item xs={12}>
            <Box
              my={6}
              mx={2}
              display="flex"
              flexDirection="column"
              textAlign="center"
            >
              <Box color="success.main">
                <CheckCircleIcon fontSize="large" />
              </Box>
              <Box my={2} component="h2">
                Order completed Successfully!
              </Box>
              <Box component="p">
                Thank you for ordering. We received your order and will begin
                processing it soon.
              </Box>
              <Box mt={2}>
                <Button
                  component={Link}
                  to="/dashboard?tab=order"
                  variant="contained"
                  color="secondary"
                >
                  View Order
                </Button>
              </Box>
            </Box>
          </Grid>
        ) : cartStore.length <= 0 ? (
          <Grid item xs={12}>
            <Box my={4} mx={2} textAlign="center">
              <Box component="h3" color="error.main">
                We have found no items added in your cart to checkout
              </Box>
              <Box mt={2}>
                <Button
                  component={Link}
                  to="/list"
                  variant="contained"
                  color="primary"
                >
                  Add item
                </Button>
              </Box>
            </Box>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={8}>
              <Paper className={classes.cusPaper}>
                <ContactData />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.cusPaper}>
                <SummaryOrder />
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </section>
  );
}
