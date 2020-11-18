import React from "react";

import CSSTransition from "react-transition-group/CSSTransition";

export default function TabPanel({ value, index, children, ...restProps }) {
  return (
    <div className="myTabPanel" hidden={value !== index} {...restProps}>
      <CSSTransition
        in={value === index}
        unmountOnExit
        timeout={300}
        classNames="fade-panel"
      >
        {children}
      </CSSTransition>
    </div>
  );
}
