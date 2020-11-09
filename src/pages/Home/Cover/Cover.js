import React from "react";
import Slider from "react-slick";

import "./Cover.scss";
import IntroCard from "./IntroCard/IntroCard";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import BannerCard from "./BannerCard/BannerCard";

const useStyles = makeStyles((theme) => ({
  prevArrow: {
    position: "absolute",
    top: "50%",
    left: "0",
    transform: "translateY(-50%)",
    zIndex: "9",
    padding: "0",
    width: "auto",
    height: "auto",
    "&::before": {
      display: "none",
    },
    "&:hover, &:focus": {
      color: theme.palette.primary.main,
    },
  },
  nextArrow: {
    position: "absolute",
    top: "50%",
    right: "0",
    transform: "translateY(-50%)",
    zIndex: "9",
    padding: "0",
    width: "auto",
    height: "auto",
    "&::before": {
      display: "none",
    },
    "&:hover, &:focus": {
      color: theme.palette.primary.main,
    },
  },
}));

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  const classes = useStyles();

  return (
    <IconButton
      className={[className, classes.prevArrow].join(" ")}
      style={{ ...style }}
      onClick={onClick}
      color="primary"
    >
      <ChevronLeftIcon fontSize="large" />
    </IconButton>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  const classes = useStyles();

  return (
    <IconButton
      className={[className, classes.nextArrow].join(" ")}
      style={{ ...style }}
      onClick={onClick}
      color="primary"
    >
      <ChevronRightIcon fontSize="large" />
    </IconButton>
  );
};

export default function Cover(props) {
  const { coverLeftData, coverRightData } = props;

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  let coverLeftRender = null;
  if (coverLeftData.length > 0) {
    coverLeftRender = coverLeftData.map((ele) => {
      return <IntroCard key={ele.id} item={ele} />;
    });
  }

  let coverRightRender = null;
  if (coverRightData.length > 0) {
    coverRightRender = coverRightData.map((ele) => {
      return <BannerCard key={ele.id} item={ele} />;
    });
  }
  return (
    <section className="cover">
      <div className="cover__left">
        <Slider {...settings}>{coverLeftRender}</Slider>
      </div>
      <div className="cover__right">{coverRightRender}</div>
    </section>
  );
}
