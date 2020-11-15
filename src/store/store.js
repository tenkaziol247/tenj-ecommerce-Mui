import { createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducer/rootReducer";

const saveStoreToLocalStorage = (state) => {
  try {
    const jsonState = JSON.stringify(state);
    localStorage.setItem("reduxState", jsonState);
  } catch (error) {
    console.log(error);
  }
};

const loadDataFromLocalStorage = () => {
  try {
    const jsonState = localStorage.getItem("reduxState");
    if (jsonState === null) {
      return undefined;
    }
    return JSON.parse(jsonState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const prevLoadState = loadDataFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  prevLoadState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(() => saveStoreToLocalStorage({ cart: store.getState().cart }));

export default store;
