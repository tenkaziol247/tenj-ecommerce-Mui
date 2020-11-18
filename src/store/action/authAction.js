import * as actionTypes from "../actionTypes/actionTypes";
import { auth } from "../../firebase";

export const onAuthStateChanged = (user) => {
  return {
    type: actionTypes.ON_AUTH_STATE_CHANGED,
    user,
  };
};

export const logoutStart = () => {
  return {
    type: actionTypes.LOG_OUT_START,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOG_OUT_SUCCESS,
  };
};

export const logoutFail = (error) => {
  return {
    type: actionTypes.LOG_OUT_FAIL,
    error,
  };
};

export const logout = () => (dispatch) => {
  dispatch(logoutStart());
  auth
    .signOut()
    .then(() => dispatch(logoutSuccess()))
    .catch((err) => dispatch(logoutFail(err)));
};

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

export const registerSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
  };
};

export const registerFail = (error) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error,
  };
};

export const register = (email, password, userName) => (dispatch) => {
  dispatch(registerStart());
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      return auth.currentUser.updateProfile({
        displayName: userName,
      });
    })
    .then(() => {
      dispatch(registerSuccess());
    })
    .catch((err) => {
      dispatch(registerFail(err));
    });
};

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error,
  };
};

export const login = (email, password) => (dispatch) => {
  dispatch(loginStart());
  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(loginSuccess());
    })
    .catch((err) => {
      dispatch(loginFail(err));
    });
};
