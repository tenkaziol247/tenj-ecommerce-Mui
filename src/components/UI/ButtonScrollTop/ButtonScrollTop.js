import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import "./ButtonScrollTop.scss";

export default function ButtonScrollTop(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (
        document.body.scrollTop >= 400 ||
        document.documentElement.scrollTop >= 400
      ) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={["buttonScrollTop", show ? "show" : ""].join(" ")}>
      <IconButton color="primary" onClick={handleScrollTop}>
        <KeyboardArrowUpIcon />
      </IconButton>
    </div>
  );
}
