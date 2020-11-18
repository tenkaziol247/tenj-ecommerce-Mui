import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  auth: authReducer,
});

export default rootReducer;
