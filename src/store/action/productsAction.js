import axiosBaseURL from "../../constant/axios-baseURL";
import * as actionTypes from "../actionTypes/actionTypes";

export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchProductsSuccess = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products,
  };
};

export const fetchProductsFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error,
  };
};

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsStart());
  axiosBaseURL("/products.json")
    .then((res) => {
      dispatch(fetchProductsSuccess(res.data));
    })
    .catch((err) => {
      console.log(err.message);
      dispatch(fetchProductsFail(err));
    });
};
