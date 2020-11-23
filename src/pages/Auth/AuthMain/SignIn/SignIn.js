import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import "./SignIn.scss";
import * as actions from "../../../../store/action";

const useStyles = makeStyles((theme) => ({
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
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

export default function SignIn(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const login = (email, password) => dispatch(actions.login(email, password));

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  return (
    <div className="signIn">
      <form onSubmit={formik.handleSubmit}>
        <div className="signIn__item">
          <TextField
            className={classes.cusTextField}
            variant="outlined"
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            size="small"
          />
        </div>
        <div className="signIn__item">
          <TextField
            className={classes.cusTextField}
            variant="outlined"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            size="small"
          />
        </div>
        <div className="signIn__item"></div>
        <div className="signIn__forgotPassword">
          <span onClick={() => props.handleForgotPassword(true)}>
            Forgot your password?
          </span>
        </div>
        <div className="signIn__button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.cusButton}
          >
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}
