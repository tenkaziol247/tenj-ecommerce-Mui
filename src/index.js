import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import { Provider } from "react-redux";

import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
