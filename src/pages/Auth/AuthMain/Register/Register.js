import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import "./Register.scss";
import * as actions from "../../../../store/action";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cusTextField: {
    "& > div > input": {
      backgroundColor: theme.palette.grey[200],
      "&:focus": {
        backgroundColor: theme.palette.common.white,
      },
    },
  },
  cusCheckbox: {
    marginRight: "4px",
    "& > span:last-child": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.9rem",
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
  name: yup.string("Enter your name").required("Your name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  policyConfirmation: yup
    .bool()
    .oneOf([true], "Confirm privacy policy is required"),
});

export default function Register(props) {
  const classes = useStyles();

  const { redirectPath, currentUser } = useSelector((state) => {
    return state.auth;
  });

  const history = useHistory();

  useEffect(() => {
    if (currentUser !== null) {
      history.replace(redirectPath);
    }
  }, [currentUser, redirectPath, history]);

  const dispatch = useDispatch();

  const registerHandle = (email, password, displayName) =>
    dispatch(actions.register(email, password, displayName));

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      policyConfirmation: false,
    },
    validationSchema,
    onSubmit: (values) => {
      registerHandle(values.email, values.password, values.name);
    },
  });

  return (
    <div className="register">
      <form onSubmit={formik.handleSubmit}>
        <div className="register__item">
          <TextField
            className={classes.cusTextField}
            variant="outlined"
            fullWidth
            id="name"
            name="name"
            label="Your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            size="small"
          />
        </div>
        <div className="register__item">
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
        <div className="register__item">
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
        <div className="register__item">
          <TextField
            className={classes.cusTextField}
            variant="outlined"
            fullWidth
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Re-enter password"
            type="password"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirmation &&
              Boolean(formik.errors.passwordConfirmation)
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
            size="small"
          />
        </div>
        <div className="register__item">
          <FormControlLabel
            className={classes.cusCheckbox}
            control={
              <Checkbox
                checked={formik.values.policyConfirmation}
                onChange={formik.handleChange}
                name="policyConfirmation"
                color="primary"
              />
            }
            label="I agree to the"
          />
          <span className="register__privacyPolicy">privacy policy</span>
          <p className="register__errorMessage">
            {formik.touched.policyConfirmation &&
              formik.errors.policyConfirmation}
          </p>
        </div>
        <div className="register__button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.cusButton}
          >
            Create account
          </Button>
        </div>
      </form>
    </div>
  );
}
