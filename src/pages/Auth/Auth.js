import React, { useState } from "react";

import "./Auth.scss";
import AuthMain from "./AuthMain/AuthMain";
import { useDispatch } from "react-redux";
import * as actions from "../../store/action";

export default function Auth(props) {
  const [forgotPassword, setForgotPassword] = useState(false);

  const dispatch = useDispatch();

  const resetSuccessMessage = () => dispatch(actions.resetSuccessMessage());

  const handleForgotPassword = (forgot) => {
    if (forgot) {
      setForgotPassword(true);
    } else {
      setForgotPassword(false);
      resetSuccessMessage();
    }
  };

  return (
    <main className="auth">
      <AuthMain
        forgotPassword={forgotPassword}
        handleForgotPassword={handleForgotPassword}
      />
    </main>
  );
}
