import * as actionTypes from "../actionTypes/actionTypes";
import { auth } from "../../firebase";

export const onAuthStateChanged = (user) => {
  return {
    type: actionTypes.ON_AUTH_STATE_CHANGED,
    user,
  };
};

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.SET_REDIRECT_PATH,
    redirectPath: path,
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

export const resetError = () => {
  return {
    type: actionTypes.RESET__ERROR,
  };
};

export const resetSuccessMessage = () => {
  return {
    type: actionTypes.RESET_SUCCESS_MESSAGE,
  };
};

export const resetPasswordStart = () => {
  return {
    type: actionTypes.RESET_PASSWORD_START,
  };
};

export const resetPasswordSuccess = (successMessage) => {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    successMessage,
  };
};

export const resetPasswordFail = (error) => {
  return {
    type: actionTypes.RESET_PASSWORD_FAIL,
    error,
  };
};

export const resetPassword = (email) => (dispatch) => {
  dispatch(resetPasswordStart());
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(
        resetPasswordSuccess(
          "Please check your email and click on the provided link to reset your password."
        )
      );
    })
    .catch((err) => {
      dispatch(resetPasswordFail(err));
    });
};

export const updateDisplayNameStart = () => {
  return {
    type: actionTypes.UPDATE_DISPLAYNAME_START,
  };
};

export const updateDisplayNameSuccess = (successMessage) => {
  return {
    type: actionTypes.UPDATE_DISPLAYNAME_SUCCESS,
    successMessage,
  };
};

export const updateDisplayNameFail = (error) => {
  return {
    type: actionTypes.UPDATE_DISPLAYNAME_FAIL,
    error,
  };
};

export const updateDisplayName = (name) => (dispatch) => {
  dispatch(updateDisplayNameStart());
  auth.currentUser
    .updateProfile({
      displayName: name,
      photoURL: "",
    })
    .then(() => {
      dispatch(updateDisplayNameSuccess("Update user name success."));
    })
    .catch((err) => {
      dispatch(updateDisplayNameFail(err));
    });
};

export const updatePasswordStart = () => {
  return {
    type: actionTypes.UPDATE_PASSWORD_START,
  };
};

export const updatePasswordSuccess = (successMessage) => {
  return {
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
    successMessage,
  };
};

export const updatePasswordFail = (error) => {
  return {
    type: actionTypes.UPDATE_PASSWORD_FAIL,
    error,
  };
};

export const updatePassword = (newPassword) => (dispatch) => {
  dispatch(updatePasswordStart());
  auth.currentUser
    .updatePassword(newPassword)
    .then(() => {
      dispatch(updatePasswordSuccess("Update password success."));
    })
    .catch((err) => {
      dispatch(updatePasswordFail(err));
    });
};
