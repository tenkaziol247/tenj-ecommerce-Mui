import React, { useState } from "react";

import "./Auth.scss";
import AuthMain from "./AuthMain/AuthMain";
import AuthHeader from "./AuthHeader/AuthHeader";

export default function Auth(props) {
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleForgotPassword = (forgot) => {
    if (forgot) {
      setForgotPassword(true);
    } else {
      setForgotPassword(false);
    }
  };

  return (
    <main className="auth">
      {/* <AuthHeader /> */}
      <AuthMain
        forgotPassword={forgotPassword}
        handleForgotPassword={handleForgotPassword}
      />
    </main>
  );
}
