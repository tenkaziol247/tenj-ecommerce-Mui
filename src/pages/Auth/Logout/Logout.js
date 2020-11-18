import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/action";

export default function Logout(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const logout = () => dispatch(actions.logout());
    logout();
  }, [dispatch]);

  return <Redirect to="/" />;
}
