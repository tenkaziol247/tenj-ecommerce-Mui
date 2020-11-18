import * as actionTypes from "../actionTypes/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  redirectPath: "/",
};

const authStateChanged = (state, action) => {
  return updateObject(state, { currentUser: action.user });
};

const actionStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const actionSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};

const actionFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_AUTH_STATE_CHANGED:
      return authStateChanged(state, action);
    case actionTypes.REGISTER_START:
    case actionTypes.LOG_OUT_START:
    case actionTypes.LOGIN_START:
      return actionStart(state, action);
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOG_OUT_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return actionSuccess(state, action);
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOG_OUT_FAIL:
    case actionTypes.LOGIN_FAIL:
      return actionFail(state, action);
    default:
      return state;
  }
};

export default authReducer;
