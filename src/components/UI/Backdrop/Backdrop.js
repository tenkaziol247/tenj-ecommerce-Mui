import React from "react";

import "./Backdrop.scss";

export default function Backdrop(props) {
  return props.show ? (
    <div className="backdrop" onClick={props.removeBackdrop}></div>
  ) : null;
}
