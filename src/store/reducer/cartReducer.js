import * as actionTypes from "../actionTypes/actionTypes";

const initialState = {
  cartStore: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
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
      return {
        ...state,
        cartStore: updateCartStore,
      };
    case actionTypes.REMOVE_TO_CART:
      return {
        ...state,
        cartStore: state.cartStore.filter((ele) => {
          return ele.id !== action.id;
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;
