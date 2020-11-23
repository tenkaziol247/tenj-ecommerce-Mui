import * as actionTypes from "../actionTypes/actionTypes";
import { database } from "../../firebase";
import { resetCartStore } from "./cartAction";

export const placeOrderStart = () => {
  return {
    type: actionTypes.PLACE_ORDER_START,
  };
};

export const placeOrderSuccess = () => {
  return {
    type: actionTypes.PLACE_ORDER_SUCCESS,
  };
};

export const placeOrderFail = (error) => {
  return {
    type: actionTypes.PLACE_ORDER_FAIL,
    error,
  };
};

export const placeOrder = (order) => (dispatch) => {
  dispatch(placeOrderStart());
  database
    .ref("orders")
    .push()
    .set(order, (err) => {
      if (err) {
        dispatch(placeOrderFail(err));
      } else {
        dispatch(placeOrderSuccess());
        dispatch(resetCartStore());
      }
    });
};

export const resetSuccessStatus = () => {
  return {
    type: actionTypes.RESET_SUCCESS_STATUS,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    newOrders: data,
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error,
  };
};

export const fetchOrder = (userId) => (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    database
      .ref("/orders/")
      .orderByChild("userId")
      .equalTo(userId)
      .on("value", (snapshot) => {
        const newData = [];
        if (snapshot.val()) {
          Object.keys(snapshot.val()).map((key) => {
            return newData.push({ ...snapshot.val()[key], orderId: key });
          });
        }
        dispatch(fetchOrderSuccess(newData));
      });
  } catch (err) {
    dispatch(fetchOrderFail(err));
  }
};
