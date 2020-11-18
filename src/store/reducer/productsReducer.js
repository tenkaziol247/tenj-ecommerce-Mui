import * as actionTypes from "../actionTypes/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  productsStore: [],
  loading: false,
  error: null,
};

const fetchProductsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchProductsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    productsStore: action.products,
  });
};

const fetchProductsFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductsStart(state, action);
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action);
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchProductsFail(state, action);
    default:
      return state;
  }
};

export default productsReducer;
