import React from "react";

import bgImage from "../../assets/images/page-background-cover.jpg";
import "./BackgroundCover.scss";

const BackgroundCover = (props) => {
  return (
    <section
      className="backgroundCover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="backgroundCover__content">{props.children}</div>
    </section>
  );
};

export default BackgroundCover;
