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

export const removeToCart = (id) => {
  return {
    type: actionTypes.REMOVE_TO_CART,
    id: id,
  };
};
