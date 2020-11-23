import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import "./AuthMain.scss";
import MyTabPanel from "../../../components/MyTabPanel/MyTabPanel";
import SignIn from "./SignIn/SignIn";
import Register from "./Register/Register";
import Loader from "../../../components/Loader/Loader";
import * as actions from "../../../store/action";

const useStyles = makeStyles((theme) => ({
  cusTab: {
    fontSize: "1.2rem",
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  cusTextField: {
    "& > div > input": {
      backgroundColor: theme.palette.grey[200],
      "&:focus": {
        backgroundColor: theme.palette.common.white,
      },
    },
  },
  cusButton: {
    color: theme.palette.common.white,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function AuthMain(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { error, loading, successMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const sendPasswordResetEmail = (email) =>
    dispatch(actions.resetPassword(email));

  useEffect(() => {
    error && alert(error.message);
    const resetError = () => dispatch(actions.resetError());
    const resetSuccessMessage = () => dispatch(actions.resetSuccessMessage());
    return () => {
      resetError();
      successMessage !== "" && resetSuccessMessage();
    };
  }, [error, successMessage, dispatch]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  let tabPanelRender = (
    <>
      <MyTabPanel value={value} index={0}>
        <div className="authMain__tabPanel">
          <SignIn handleForgotPassword={props.handleForgotPassword} />
        </div>
      </MyTabPanel>
      <MyTabPanel value={value} index={1}>
        <div className="authMain__tabPanel">
          <Register />
        </div>
      </MyTabPanel>
    </>
  );

  if (loading) {
    tabPanelRender = <Loader />;
  }

  let authMainRender = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Sign In" className={classes.cusTab} />
        <Tab label="Register" className={classes.cusTab} />
      </Tabs>
      {tabPanelRender}
    </>
  );

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: (values) => {
      sendPasswordResetEmail(values.email);
    },
  });

  if (props.forgotPassword) {
    authMainRender = (
      <>
        <div className="authMain__backLogin">
          <Button
            onClick={() => props.handleForgotPassword()}
            color="primary"
            size="small"
            startIcon={<ChevronLeftIcon />}
          >
            Login
          </Button>
        </div>
        <h2>Forgot Your Password?</h2>
        {successMessage === "" ? (
          <form
            className="authMain__forgotPassword"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              className={classes.cusTextField}
              variant="outlined"
              fullWidth
              id="email"
              name="email"
              label="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              size="small"
            />
            <div className="authMain__forgotPassword__btn">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.cusButton}
              >
                Send
              </Button>
            </div>
          </form>
        ) : (
          <div className="authMain__forgotPassword__successMessage">
            <p>{successMessage}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <section className="authMain">
      <div className="authMain__container">
        {authMainRender}
        <div className="authMain__container__social">
          <Button
            startIcon={<ArrowBackIosIcon fontSize="small" />}
            color="secondary"
            size="small"
            component={Link}
            to="/"
          >
            Continue shopping
          </Button>
        </div>
      </div>
    </section>
  );
}
