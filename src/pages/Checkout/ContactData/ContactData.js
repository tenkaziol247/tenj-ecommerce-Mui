import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import "./ContactData.scss";
import * as actions from "../../../store/action";
import Loader from "../../../components/Loader/Loader";

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
  cusTextField: {
    "& div > input": {
      backgroundColor: theme.palette.grey[100],
      "&:focus": {
        backgroundColor: theme.palette.common.white,
      },
    },
  },
  btnConfirm: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
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

  const [openDialog, setOpenDialog] = useState(false);
  const [orderContact, setOrderContact] = useState(null);

  const { cartStore, shippingType } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDiaLog = () => {
    setOpenDialog(true);
  };

  const handleAgreeOrder = () => {
    const date = new Date().getTime();
    dispatch(
      actions.placeOrder({
        orderDate: date,
        orderContact: { ...orderContact },
        orderData: [...cartStore],
        orderType: shippingType,
        userId: currentUser.uid,
      })
    );
  };

  const placeOrder = (values) => {
    setOrderContact({ ...values });
    handleOpenDiaLog();
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
      placeOrder(values);
    },
  });

  return (
    <div className="contactData">
      <h3 className="contactData__title">Your Contact Data</h3>
      <form className="contactData__form" onSubmit={formik.handleSubmit}>
        <Grid justify="space-between" container className={classes.root}>
          <Grid className={classes.cusGridItem} item xs={12}>
            <TextField
              className={classes.cusTextField}
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
              className={classes.cusTextField}
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
              className={classes.cusTextField}
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
                className={classes.cusTextField}
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
                className={classes.cusTextField}
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <DialogTitle>
              <Box borderBottom={1} textAlign="center">
                Order Confirmation
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box pl={1} pr={3} pb={3} borderBottom={1}>
                <Typography component="p">
                  <b>Customer: </b>
                  {orderContact && orderContact.fullName}
                </Typography>
                <Typography component="p">
                  <b>Address: </b>
                  {orderContact && orderContact.streetAddress},{" "}
                  {orderContact && orderContact.country}
                </Typography>
                <Typography component="p">
                  <b>Zip code: </b>
                  {orderContact && orderContact.zipCode}
                </Typography>
                <Typography component="p">
                  <b>Phone number: </b>
                  {orderContact && orderContact.phoneNumber}
                </Typography>
                <Typography component="p">
                  <b>Total order value: </b>
                  {cartStore.length > 0 &&
                    cartStore
                      .reduce((sum, ele) => {
                        return (sum += ele.price * ele.quantity);
                      }, 0)
                      .toFixed(2)}
                  $
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                className={classes.btnConfirm}
                variant="contained"
                size="small"
                onClick={handleAgreeOrder}
              >
                Confirm
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                size="small"
                onClick={handleCloseDialog}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
