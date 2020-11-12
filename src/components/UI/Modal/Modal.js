import React, { useEffect } from "react";

import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

export default function Modal({
  openModal,
  handleCloseModal,
  children,
  ...restProps
}) {
  useEffect(() => {
    if (openModal) {
      document.body.classList.add("modalOpen");
    } else {
      document.body.classList.remove("modalOpen");
    }
    return () => {
      document.body.classList.remove("modalOpen");
    };
  }, [openModal]);
  return (
    <>
      <Backdrop show={openModal} removeBackdrop={handleCloseModal} />
      <div
        className="modal"
        style={{ display: `${openModal ? "block" : "none"}` }}
      >
        {children}
      </div>
    </>
  );
}
