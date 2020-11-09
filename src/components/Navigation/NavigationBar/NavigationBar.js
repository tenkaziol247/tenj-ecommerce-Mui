import React from "react";

import "./NavigationBar.scss";
import NavigationItems from "./NavigationItems/NavigationItems";

export default function NavigationBar(props) {
  return (
    <div className="navigationBar">
      <div className="navigationBar__container">
        <div className="navigationBar__main">
          <NavigationItems />
        </div>
        <div className="navigationBar__campaign">
          <h5>
            <span>
              <i className="fa fa-truck"></i>
            </span>
            Free Shipping on Orders Over $100
          </h5>
        </div>
      </div>
    </div>
  );
}
