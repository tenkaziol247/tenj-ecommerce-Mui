import * as actionTypes from "../actionTypes/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  successStatus: false,
  error: null,
  loading: false,
};

const placeOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const placeOrderSuccess = (state, action) => {
  return updateObject(state, { loading: false, successStatus: true });
};

const placeOrderFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const resetSuccessStatus = (state, action) => {
  return updateObject(state, { successStatus: false });
};

const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: [...action.newOrders] });
};

const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLACE_ORDER_START:
      return placeOrderStart(state, action);
    case actionTypes.PLACE_ORDER_SUCCESS:
      return placeOrderSuccess(state, action);
    case actionTypes.PLACE_ORDER_FAIL:
      return placeOrderFail(state, action);
    case actionTypes.RESET_SUCCESS_STATUS:
      return resetSuccessStatus(state, action);
    case actionTypes.FETCH_ORDER_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDER_FAIL:
      return fetchOrderFail(state, action);
    default:
      return state;
  }
};

export default orderReducer;
