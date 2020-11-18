import React, { useEffect } from "react";
import Transition from "react-transition-group/Transition";

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
      <Transition
        in={openModal}
        timeout={{ enter: 400, exit: 300 }}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div
            className={[
              "modal",
              state === "entering"
                ? "modalOpen"
                : state === "exiting"
                ? "modalClose"
                : null,
            ].join(" ")}
          >
            {children}
          </div>
        )}
      </Transition>
    </>
  );
}
