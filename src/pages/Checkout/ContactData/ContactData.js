import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import "./ContactData.scss";
import * as actions from "../../../store/action";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: "border-box",
  },
  cusGridItem: {
    margin: "12px 0",
  },
  cusBox: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const validationSchema = yup.object({
  fullName: yup
    .string("Enter your name")
    .max(30, "Fullname should be of maximum 30 characters length")
    .required("Fullname is required"),
  country: yup.string("Enter your country").required("Country is required"),
  streetAddress: yup
    .string("Enter your street address")
    .required("Street address is required"),
  zipCode: yup
    .number("Enter ZIP code")
    .min(5, "Zip code should be of minimum 5 characters length")
    .required("Zip code is required"),
  phoneNumber: yup
    .number("Enter your phone number")
    .min(9, "Phone number should be of minimum 9 characters length")
    .required("Phone number is required"),
});

export default function ContactData(props) {
  const classes = useStyles();

  const { cartStore, shippingType } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const placeOrder = (
    orderContact,
    orderData,
    shippingType,
    orderDate,
    userId
  ) => {
    dispatch(
      actions.placeOrder({
        orderDate: orderDate,
        orderContact: orderContact,
        orderData: orderData,
        orderType: shippingType,
        userId,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      country: "",
      streetAddress: "",
      zipCode: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const date = new Date().getTime();
      placeOrder(values, cartStore, shippingType, date, currentUser.uid);
    },
  });

  return (
    <div className="contactData">
      <h3 className="contactData__title">Your Contact Data</h3>
      <form className="contactData__form" onSubmit={formik.handleSubmit}>
        <Grid justify="space-between" container className={classes.root}>
          <Grid className={classes.cusGridItem} item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="fullName"
              id="fullName"
              label="Full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
          <Grid className={classes.cusGridItem} item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="country"
              id="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          <Grid className={classes.cusGridItem} item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="streetAddress"
              id="streetAddress"
              label="Street address"
              value={formik.values.streetAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.streetAddress &&
                Boolean(formik.errors.streetAddress)
              }
              helperText={
                formik.touched.streetAddress && formik.errors.streetAddress
              }
            />
          </Grid>
          <Grid className={classes.cusGridItem} item xs={12} sm={6}>
            <Box width="98%" className={classes.cusBox}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="zipCode"
                id="zipCode"
                label="Zip code"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
            </Box>
          </Grid>
          <Grid className={classes.cusGridItem} item xs={12} sm={6}>
            <Box width="98%" ml="auto" className={classes.cusBox}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="phoneNumber"
                id="phoneNumber"
                label="Phone number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Box>
          </Grid>
          <Grid className={classes.cusGridItem} item xs={12} sm={5}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Place order
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
