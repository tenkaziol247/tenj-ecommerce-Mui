import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  auth: authReducer,
  order: orderReducer,
});

export default rootReducer;
