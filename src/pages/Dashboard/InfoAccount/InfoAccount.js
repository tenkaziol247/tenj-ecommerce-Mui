import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import "./InfoAccount.scss";
import * as actions from "../../../store/action";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Your name is required"),
  newPassword: yup
    .string("Enter your new password")
    .min(6, "Password should be of minimum 6 characters length"),
  newPasswordConfirmation: yup
    .string("Re-enter your new password")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const useStyles = makeStyles((theme) => ({
  cusTextField: {
    "& > div > input": {
      backgroundColor: theme.palette.common.white,
    },
  },
}));

export default function InfoAccount(props) {
  const { currentUser } = props;

  const classes = useStyles();

  const [toggle, setToggle] = useState(false);

  const { successMessage, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successMessage !== "") {
      alert(successMessage);
    }
    if (error !== null) {
      alert(error.message);
    }
    return () => {
      successMessage !== "" && dispatch(actions.resetSuccessMessage());
      error && dispatch(actions.resetError());
    };
  }, [successMessage, error, dispatch]);

  const handleUpdateInfo = (name, newPassword) => {
    if (name !== currentUser.displayName) {
      dispatch(actions.updateDisplayName(name));
    }
    if (newPassword !== "") {
      dispatch(actions.updatePassword(newPassword));
    }
    if (name === currentUser.displayName && newPassword === "") {
      alert("Dont have any change");
    }
  };

  const handleToggleClick = () => {
    setToggle(true);
  };

  const formik = useFormik({
    initialValues: {
      name: currentUser.displayName,
      newPassword: "",
      newPasswordConfirmation: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleUpdateInfo(values.name, values.newPassword);
    },
  });

  return (
    <div className="infoAccount">
      {currentUser ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="infoAccount__label">Full name:</div>
          <TextField
            className={classes.cusTextField}
            variant="outlined"
            fullWidth
            id="name"
            name="name"
            label="Enter your name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            size="small"
          />
          <div className="infoAccount__label">Email:</div>
          <TextField
            className={classes.cusTextField}
            fullWidth
            variant="outlined"
            id="email"
            name="email"
            value={currentUser.email}
            size="small"
            disabled
            onChange={() => {}}
          />

          {!toggle ? (
            <div className="infoAccount__button">
              <Button onClick={handleToggleClick} variant="outlined">
                Change password
              </Button>
            </div>
          ) : (
            <>
              <div className="infoAccount__label">New password:</div>
              <TextField
                className={classes.cusTextField}
                fullWidth
                variant="outlined"
                id="newPassword"
                name="newPassword"
                label="Enter your new password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                size="small"
                type="password"
              />

              <div className="infoAccount__label">Confirm new password:</div>
              <TextField
                className={classes.cusTextField}
                fullWidth
                variant="outlined"
                id="newPasswordConfirmation"
                name="newPasswordConfirmation"
                label="Re-enter your new password"
                value={formik.values.newPasswordConfirmation}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPasswordConfirmation &&
                  Boolean(formik.errors.newPasswordConfirmation)
                }
                helperText={
                  formik.touched.newPasswordConfirmation &&
                  formik.errors.newPasswordConfirmation
                }
                size="small"
                type="password"
              />
            </>
          )}

          <div className="infoAccount__submit">
            <Button variant="contained" color="primary" type="submit">
              Update Infomation
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

InfoAccount.propTypes = {
  currentUser: PropTypes.object.isRequired,
};
