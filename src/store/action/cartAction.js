import * as actionTypes from "../actionTypes/actionTypes";

export const addToCart = (item, quantity) => {
  return {
    type: actionTypes.ADD_TO_CART,
    item: {
      id: item.id,
      price: item.newPrice,
      name: item.title,
    },
    quantity,
  };
};

export const removeFromCart = (id) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    id: id,
  };
};

export const setShippingType = (shippingType) => {
  return {
    type: actionTypes.SET_SHIPPING_TYPE,
    shippingType,
  };
};

export const resetCartStore = () => {
  return {
    type: actionTypes.RESET_CART_STORE,
  };
};
