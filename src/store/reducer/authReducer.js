import * as actionTypes from "../actionTypes/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  currentUser: null,
  error: null,
  loading: true,
  redirectPath: "/",
  successMessage: "",
};

const authStateChanged = (state, action) => {
  return updateObject(state, { currentUser: action.user, loading: false });
};

const setRedirectPath = (state, action) => {
  return updateObject(state, { redirectPath: action.redirectPath });
};

const actionStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const actionSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};

const actionFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const resetError = (state, action) => {
  return updateObject(state, { error: null });
};

const resetPasswordSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    successMessage: action.successMessage,
  });
};

const resetSuccessMessage = (state, action) => {
  return updateObject(state, {
    successMessage: "",
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_AUTH_STATE_CHANGED:
      return authStateChanged(state, action);

    case actionTypes.SET_REDIRECT_PATH:
      return setRedirectPath(state, action);

    case actionTypes.REGISTER_START:
    case actionTypes.LOG_OUT_START:
    case actionTypes.LOGIN_START:
    case actionTypes.RESET_PASSWORD_START:
    case actionTypes.UPDATE_DISPLAYNAME_START:
    case actionTypes.UPDATE_PASSWORD_START:
      return actionStart(state, action);

    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOG_OUT_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return actionSuccess(state, action);

    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOG_OUT_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.RESET_PASSWORD_FAIL:
    case actionTypes.UPDATE_DISPLAYNAME_FAIL:
    case actionTypes.UPDATE_PASSWORD_FAIL:
      return actionFail(state, action);

    case actionTypes.RESET__ERROR:
      return resetError(state, action);

    case actionTypes.RESET_PASSWORD_SUCCESS:
    case actionTypes.UPDATE_DISPLAYNAME_SUCCESS:
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return resetPasswordSuccess(state, action);

    case actionTypes.RESET_SUCCESS_MESSAGE:
      return resetSuccessMessage(state, action);

    default:
      return state;
  }
};

export default authReducer;
