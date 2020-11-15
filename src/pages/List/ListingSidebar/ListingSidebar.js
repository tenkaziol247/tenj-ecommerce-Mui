import { Button, Slider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { makeStyles } from "@material-ui/core/styles";

import "./ListingSidebar.scss";
import CategoryFilter from "./CategoryFilter/CategoryFilter";

const useStyles = makeStyles((theme) => ({
  moreIcon: {
    opacity: 1,
    [theme.breakpoints.down("md")]: {
      opacity: 0,
    },
  },
  lessIcon: {
    opacity: 0,
    [theme.breakpoints.down("md")]: {
      opacity: 1,
    },
  },
}));

export default function ListingSidebar(props) {
  const classes = useStyles();
  const { clearAllClickedHandler, flagClear } = props;

  const [value, setValue] = useState([0, 100]);

  useEffect(() => {
    setValue([0, 100]);
  }, [flagClear]);

  const collapsibleClickedHandler = (e) => {
    const content = e.currentTarget.nextElementSibling;
    const styleMaxHeightOfContent = window
      .getComputedStyle(content)
      .getPropertyValue("max-height");
    if (styleMaxHeightOfContent !== "0px") {
      content.style.maxHeight = "0px";
      e.currentTarget.children[0].classList.add("less");
      e.currentTarget.children[0].classList.remove("more");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      e.currentTarget.children[0].classList.remove("less");
      e.currentTarget.children[0].classList.add("more");
    }
  };

  const rangeSliderHandler = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="listingSidebar">
      <div className="listingSidebar__header">
        <h5>Filters:</h5>
        <Button onClick={clearAllClickedHandler} size="small" color="secondary">
          Clear All
        </Button>
      </div>
      <div className="listingSidebar__category">
        <h5
          className="listingSidebar__collapsible"
          onClick={(e) => collapsibleClickedHandler(e)}
        >
          Category
          <span>
            <ExpandMoreIcon className={classes.moreIcon} />
            <ExpandLessIcon className={classes.lessIcon} />
          </span>
        </h5>
        <div className="listingSidebar__content">
          <CategoryFilter
            fieldCategory={props.fieldCategory}
            filterCategoryClickedHandler={props.filterCategoryClickedHandler}
          />
        </div>
      </div>
      <div className="listingSidebar__price">
        <h5
          className="listingSidebar__collapsible"
          onClick={(e) => collapsibleClickedHandler(e)}
        >
          Price
          <span>
            <ExpandMoreIcon className={classes.moreIcon} />
            <ExpandLessIcon className={classes.lessIcon} />
          </span>
        </h5>
        <div className="listingSidebar__content">
          <p style={{ fontSize: "0.9rem", paddingLeft: "8px" }}>
            <span style={{ fontWeight: 500 }}>Filter</span>: $
            {props.currentValue[0]} &#247; ${props.currentValue[1]}
          </p>
          <div className="listingSidebar__rangeSlider">
            <Slider value={value} onChange={rangeSliderHandler} step={0.1} />
            <div className="listingSidebar__rangeSlider__panel">
              <div>
                <span>$</span> {Math.round(value[0] * 30)}
              </div>
              <div>
                <span>$</span> {Math.round(value[1] * 30)}
              </div>
            </div>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              onClick={() =>
                props.onFilterPrice([
                  Math.round(value[0] * 30),
                  Math.round(value[1] * 30),
                ])
              }
            >
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
