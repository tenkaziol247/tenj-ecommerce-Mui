import React from "react";

import BackgroundCover from "../../components/BackgroundCover/BackgroundCover";
import DashboardMain from "./DashboardMain/DashboardMain";

export default function Profile(props) {
  return (
    <>
      <BackgroundCover>
        <h2>My Account</h2>
        <p>TenJ</p>
      </BackgroundCover>
      <DashboardMain />
    </>
  );
}
