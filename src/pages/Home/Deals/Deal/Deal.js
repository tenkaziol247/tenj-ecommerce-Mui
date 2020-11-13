import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Deal.scss";

export default function Deal(props) {
  const { item } = props;
  const countDownDate = new Date(item.countDown).getTime();

  const [dayCountDown, setDayCountDown] = useState("0");
  const [hourCountDown, setHourCountDown] = useState("0");
  const [minuteCountDown, setMinuteCountDown] = useState("0");
  const [secondCountDown, setSecondCountDown] = useState("0");

  useEffect(() => {
    let interval = setInterval(() => {
      const distance = countDownDate - new Date().getTime();
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance > 0) {
        setDayCountDown(days);
        setHourCountDown(hours);
        setMinuteCountDown(minutes);
        setSecondCountDown(seconds);
      }
    }, 1000);

    if (
      dayCountDown === 0 &&
      hourCountDown === 0 &&
      minuteCountDown === 0 &&
      secondCountDown === 0
    ) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    dayCountDown,
    hourCountDown,
    minuteCountDown,
    secondCountDown,
    countDownDate,
  ]);

  return (
    <div className="deal" style={{ backgroundImage: `url(${item.image})` }}>
      <div className="deal__container">
        <div className="deal__header">
          <h5 className="deal__header__title">{item.title}</h5>
          <p className="deal__header__subtitle">{item.subtitle}</p>
        </div>
        <div className="deal__body">
          <div className="deal__body__content">
            <Link to={item.toPath}>{item.content}</Link>
          </div>
          <div className="deal__body__price">
            <span className="deal__body__newPrice">${item.newPrice}.00</span>
            <span className="deal__body__oldPrice">
              {item.oldPrice ? `$${item.oldPrice}.99` : null}
            </span>
          </div>
          <div className="deal__body__btn">
            <Link to={item.toPath}>
              {item.buttonContent}
              <span>
                <i className="fa fa-long-arrow-alt-right"></i>
              </span>
            </Link>
          </div>
        </div>
        <div className="deal__countDown">
          <div className="deal__countDown__item">{dayCountDown}</div>:
          <div className="deal__countDown__item">{hourCountDown}</div>:
          <div className="deal__countDown__item">{minuteCountDown}</div>:
          <div className="deal__countDown__item">{secondCountDown}</div>
        </div>
      </div>
    </div>
  );
}
