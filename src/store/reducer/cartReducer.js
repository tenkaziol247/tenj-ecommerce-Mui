import * as actionTypes from "../actionTypes/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  cartStore: [],
  shippingType: "free",
};

const addToCart = (state, action) => {
  let updateCartStore = [...state.cartStore];
  let indexItem = updateCartStore.findIndex((ele) => {
    return ele.id === action.item.id;
  });
  if (indexItem === -1) {
    updateCartStore = [
      ...updateCartStore,
      { ...action.item, quantity: action.quantity },
    ];
  } else {
    updateCartStore[indexItem].quantity += action.quantity;
  }
  return updateObject(state, {
    cartStore: updateCartStore,
  });
};

const removeFromCart = (state, action) => {
  return updateObject(state, {
    cartStore: state.cartStore.filter((ele) => {
      return ele.id !== action.id;
    }),
  });
};

const setShippingType = (state, action) => {
  return updateObject(state, { shippingType: action.shippingType });
};

const resetCartStore = (state, action) => {
  return updateObject(state, { cartStore: [], shippingType: "free" });
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return addToCart(state, action);
    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action);
    case actionTypes.SET_SHIPPING_TYPE:
      return setShippingType(state, action);
    case actionTypes.RESET_CART_STORE:
      return resetCartStore(state, action);
    default:
      return state;
  }
};

export default cartReducer;
