import React, { useRef, useEffect, useState, Children } from "react";
import PropTypes from "prop-types";

import "./TenjCarousel.scss";

export default function TenjCarousel({
  responsive = [{ size: 0, itemsToShow: 1, itemsToScroll: 1, marginItem: 0 }],
  autoPlay = false,
  autoPlayTimeout = 5000,
  autoplayHoverPause = false,
  children,
  hoverColor = "#fcb83b",
  activeColor = "#d18800",
  showIndicator = false,
  customIndicatorImage = null,
  customIndicator = null,
  ...restProps
}) {
  const carouselEle = useRef(null);

  const [sAutoPlay, setSAutoPlay] = useState(autoPlay);
  const [widthParent, setWidthParent] = useState(1600);
  const [marginItem, setMarginItem] = useState(responsive[0].marginItem);
  const [widthCarousel, setWidthCarousel] = useState(0);
  const [widthCarouselItem, setWidthCarouselItem] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(1);
  const [itemsToScroll, setItemsToScroll] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [prevIsDisabled, setPrevIsDisabled] = useState(true);
  const [nextvIsDisabled, setNextIsDisabled] = useState(false);
  const [moving, setMoving] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState(false);
  const [initialPosition, setInitialPosition] = useState(null);
  const [transformPosition, setTransformPosition] = useState(0);
  const [walk, setWalk] = useState(0);
  const [currentIndicatorValue, setCurrentIndicatorValue] = useState(0);
  const [space, setSpace] = useState(0);

  useEffect(() => {
    const updateWidthParent = () => {
      setWidthParent(carouselEle.current.parentElement.offsetWidth);
      setPositionX(0);
    };
    updateWidthParent();
    window.addEventListener("resize", updateWidthParent);
    return () => {
      window.removeEventListener("resize", updateWidthParent);
    };
  }, []);

  //set position 0 when children changed
  useEffect(() => {
    setPositionX(0);
    setTotalItems(carouselEle.current.childElementCount);
  }, [children]);

  //calculate carouselItem-width
  useEffect(() => {
    for (let item of responsive) {
      if (window.innerWidth > item.size) {
        setWidthCarouselItem(
          carouselEle.current.parentElement.offsetWidth / item.itemsToShow -
            item.marginItem * 2
        );
        setItemsToScroll(item.itemsToScroll);
        setItemsPerScreen(item.itemsToShow);
        setMarginItem(item.marginItem);
        break;
      }
    }
  }, [responsive, widthParent]);

  //calculate carousel-width
  useEffect(() => {
    if (itemsToScroll > 1) {
      setWidthCarousel(
        Math.ceil(totalItems / itemsPerScreen) *
          ((widthCarouselItem + marginItem * 2) * itemsPerScreen)
      );
    } else {
      setWidthCarousel(totalItems * (widthCarouselItem + marginItem * 2));
    }
  }, [
    widthCarouselItem,
    marginItem,
    itemsPerScreen,
    totalItems,
    itemsToScroll,
  ]);

  useEffect(() => {
    setSpace(widthCarousel - (widthCarouselItem + marginItem * 2) * totalItems);
  }, [widthCarousel, widthCarouselItem, marginItem, totalItems]);

  //hide or show button when arrived boundary
  useEffect(() => {
    if (
      positionX <=
      carouselEle.current.parentElement.offsetWidth - widthCarousel + 20
    ) {
      setNextIsDisabled(true);
    } else {
      setNextIsDisabled(false);
    }
    if (positionX >= -20) {
      setPrevIsDisabled(true);
    } else {
      setPrevIsDisabled(false);
    }
  }, [positionX, widthCarousel]);

  //setup auto play
  useEffect(() => {
    if (sAutoPlay) {
      const timer = setTimeout(() => {
        if (
          positionX <=
          (marginItem * 2 + widthCarouselItem) * itemsToScroll - widthCarousel
        ) {
          setPositionX(0);
        } else {
          setPositionX(
            (prevState) =>
              prevState - (marginItem * 2 + widthCarouselItem) * itemsToScroll
          );
        }
      }, autoPlayTimeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    positionX,
    widthCarousel,
    widthCarouselItem,
    marginItem,
    sAutoPlay,
    itemsToScroll,
    autoPlayTimeout,
  ]);

  //update current indicator value follow positionX
  useEffect(() => {
    setCurrentIndicatorValue(
      Math.abs(positionX) /
        ((widthCarouselItem + marginItem * 2) * itemsToScroll)
    );
  }, [positionX, widthCarouselItem, marginItem, itemsToScroll]);

  const prevButtonHandler = (e) => {
    e.preventDefault();

    if (positionX >= 0) {
      setPositionX(
        carouselEle.current.parentElement.offsetWidth - widthCarousel
      );
    } else {
      setPositionX(
        (prevState) =>
          prevState + (widthCarouselItem + marginItem * 2) * itemsToScroll
      );
    }
  };

  const nextButtonHandler = (e) => {
    e.preventDefault();

    if (
      positionX <=
      carouselEle.current.parentElement.offsetWidth - widthCarousel
    ) {
      setPositionX(0);
    } else {
      setPositionX(
        (prevState) =>
          prevState - (widthCarouselItem + marginItem * 2) * itemsToScroll
      );
    }
  };

  const handleClickedIndicator = (e) => {
    setPositionX(
      -(
        e.currentTarget.value *
        (itemsToScroll * (widthCarouselItem + marginItem * 2))
      )
    );
  };

  //create swipe action
  const mouseDownHandler = (e) => {
    carouselEle.current.classList.add("moving");
    setMoving(true);
    setLeaveStatus(true);
    setInitialPosition(e.pageX);
    const transformMatrix = window
      .getComputedStyle(carouselEle.current)
      .getPropertyValue("transform");
    if (transformMatrix !== "none") {
      setTransformPosition(parseInt(transformMatrix.split(",")[4].trim()));
    }
  };

  const mouseLeaveHandler = () => {
    setMoving(false);
    carouselEle.current.classList.remove("moving");
    if (leaveStatus) {
      carouselEle.current.classList.remove("moving");
      let walkRound =
        Math.round(walk / (widthCarouselItem + marginItem * 2)) *
        (widthCarouselItem + marginItem * 2);
      if (itemsToScroll > 1) {
        if (walkRound !== 0) {
          if (walkRound > 0) {
            walkRound = (widthCarouselItem + marginItem * 2) * itemsToScroll;
          } else {
            walkRound = -(widthCarouselItem + marginItem * 2) * itemsToScroll;
          }
        }
      }
      if (positionX > -20) {
        setPositionX(0);
      } else if (
        positionX <
        carouselEle.current.parentElement.offsetWidth - widthCarousel + 20
      ) {
        setPositionX(
          carouselEle.current.parentElement.offsetWidth - widthCarousel
        );
      } else {
        setPositionX(transformPosition + walkRound);
      }
      setWalk(0);
    }
    // setInitialPosition(0);
    setLeaveStatus(false);
  };

  const mouseUpHandler = () => {
    setMoving(false);
    carouselEle.current.classList.remove("moving");
    let walkRound =
      Math.round(walk / (widthCarouselItem + marginItem * 2)) *
      (widthCarouselItem + marginItem * 2);
    if (itemsToScroll > 1) {
      if (walkRound !== 0) {
        if (walkRound > 0) {
          walkRound = (widthCarouselItem + marginItem * 2) * itemsToScroll;
        } else {
          walkRound = -(widthCarouselItem + marginItem * 2) * itemsToScroll;
        }
      }
    }
    if (positionX > -20) {
      setPositionX(0);
    } else if (
      positionX <
      carouselEle.current.parentElement.offsetWidth - widthCarousel + 20
    ) {
      setPositionX(
        carouselEle.current.parentElement.offsetWidth - widthCarousel
      );
    } else {
      setPositionX(transformPosition + walkRound);
    }
    // setInitialPosition(0);
    setWalk(0);
    setLeaveStatus(false);
  };

  const mouseMoveHandler = (e) => {
    e.preventDefault();
    if (moving) {
      const currentPosition = e.pageX;
      setWalk(currentPosition - initialPosition);
      setPositionX(transformPosition + walk);
    }
  };

  const mouseOverHandler = () => {
    if (autoPlay) {
      setSAutoPlay(false);
    }
  };

  const mouseOutHandler = () => {
    if (autoPlay) {
      setSAutoPlay(true);
    }
  };

  const dragStartHandler = (e) => {
    e.preventDefault();
  };

  const itemsRender = Children.map(children, (child) => {
    return (
      <div
        className="carousel__item"
        style={{
          minWidth: `${widthCarouselItem}px`,
          margin: `0 ${marginItem}px`,
        }}
      >
        {child}
      </div>
    );
  });

  let indicatorsRender = null;
  if (
    showIndicator &&
    itemsToScroll * (marginItem * 2 + widthCarouselItem) > 0
  ) {
    indicatorsRender = [
      ...Array(
        Math.round(
          widthCarousel / (itemsToScroll * (marginItem * 2 + widthCarouselItem))
        )
      ),
    ].map((_, index) => {
      return (
        <li
          key={`indicator-item-${index}`}
          className={`indicator__item ${
            index === currentIndicatorValue && "selected"
          }`}
          style={customIndicator}
          value={index}
          onClick={(e) => handleClickedIndicator(e)}
        ></li>
      );
    });
  }

  if (
    customIndicatorImage !== null &&
    itemsToScroll * (marginItem * 2 + widthCarouselItem) > 0
  ) {
    indicatorsRender = indicatorsRender = [
      ...Array(
        Math.round(
          widthCarousel / (itemsToScroll * (marginItem * 2 + widthCarouselItem))
        )
      ),
    ].map((_, index) => {
      return (
        <li
          key={`indicator-item-${index}`}
          className={`indicator__item__custom ${
            index === currentIndicatorValue && "selected"
          }`}
          value={index}
          style={customIndicatorImage.customStyle}
          onClick={(e) => handleClickedIndicator(e)}
        >
          <img src={customIndicatorImage.image[index]} alt="image__indicator" />
        </li>
      );
    });
  }

  return (
    <div
      className="tenj"
      style={{
        "--hoverColor": `${hoverColor}`,
        "--activeColor": `${activeColor}`,
      }}
    >
      <div
        ref={carouselEle}
        className="carousel"
        style={{
          width: `${widthCarousel}px`,
          transform: `translateX(${positionX}px)`,
          paddingRight: `${space}px`,
        }}
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseUp={mouseUpHandler}
        onMouseMove={(e) => mouseMoveHandler(e)}
        onMouseLeave={mouseLeaveHandler}
        onDragStart={(e) => dragStartHandler(e)}
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseOutHandler}
      >
        {itemsRender}
      </div>
      <button
        style={restProps.customPrev}
        disabled={!autoPlay ? prevIsDisabled : false}
        className="buttonTenj prev"
        onClick={(e) => prevButtonHandler(e)}
      >
        <i className="fa fa-chevron-left"></i>
      </button>
      <button
        style={restProps.customNext}
        disabled={!autoPlay ? nextvIsDisabled : false}
        className="buttonTenj next"
        onClick={(e) => nextButtonHandler(e)}
      >
        <i className="fa fa-chevron-right"></i>
      </button>
      <ul className="carousel__indicators">{indicatorsRender}</ul>
    </div>
  );
}

TenjCarousel.propTypes = {
  responsive: PropTypes.array,
  autoPlay: PropTypes.bool,
  autoPlayTimeout: PropTypes.number,
  autoplayHoverPause: PropTypes.bool,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  showIndicator: PropTypes.bool,
  customIndicatorImage: PropTypes.object,
  customIndicator: PropTypes.object,
  customPrev: PropTypes.object,
};
