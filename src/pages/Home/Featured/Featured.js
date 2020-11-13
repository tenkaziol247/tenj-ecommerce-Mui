import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Featured.scss";
import FeaturedPanel from "./FeaturedPanel/FeaturedPanel";
import Card from "../../../components/UI/Card/Card";

const useStyles = makeStyles((theme) => ({
  customTab: {
    color: theme.palette.grey[400],
    fontSize: "18px",
    fontWeight: 700,
    transition: "all 0.3s",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      fontWeight: 500,
      padding: "0px 8px",
    },
  },
}));

export default function Featured({ productsData, ...restProps }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [featuredData, setFeaturedData] = useState([]);
  const [onsaleData, setOnsaleData] = useState([]);
  const [topratedData, setTopratedData] = useState([]);

  useEffect(() => {
    const updateFeaturedData = [];
    const updateOnsaleData = [];
    const updateTopratedData = [];
    productsData.forEach((ele) => {
      if (ele.tab.includes("featured")) {
        updateFeaturedData.push(ele);
      }
      if (ele.tab.includes("onSale")) {
        updateOnsaleData.push(ele);
      }
      if (ele.tab.includes("topRated")) {
        updateTopratedData.push(ele);
      }
    });
    setFeaturedData(updateFeaturedData);
    setOnsaleData(updateOnsaleData);
    setTopratedData(updateTopratedData);
  }, [productsData]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const featuredPanelRender = () => {
    if (featuredData.length > 0) {
      return featuredData.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            mediaHeight="260px"
            bodyHeight="160px"
            handleShowModal={restProps.handleShowModal}
          />
        );
      });
    }
  };

  const onsalePanelRender = () => {
    if (onsaleData.length > 0) {
      return onsaleData.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            mediaHeight="260px"
            bodyHeight="160px"
            handleShowModal={restProps.handleShowModal}
          />
        );
      });
    }
  };

  const topratedPanelRender = () => {
    if (topratedData.length > 0) {
      return topratedData.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            mediaHeight="260px"
            bodyHeight="160px"
            handleShowModal={restProps.handleShowModal}
          />
        );
      });
    }
  };

  return (
    <section className="featured">
      <Paper square elevation={0}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          centered
          onChange={handleTabChange}
        >
          <Tab label="Featured" disableRipple className={classes.customTab} />
          <Tab label="On Sale" disableRipple className={classes.customTab} />
          <Tab label="Top Rated" disableRipple className={classes.customTab} />
        </Tabs>
      </Paper>
      <div className="featured__tabPanel">
        <FeaturedPanel value={value} index={0}>
          {featuredPanelRender()}
        </FeaturedPanel>
        <FeaturedPanel value={value} index={1}>
          {onsalePanelRender()}
        </FeaturedPanel>
        <FeaturedPanel value={value} index={2}>
          {topratedPanelRender()}
        </FeaturedPanel>
      </div>
    </section>
  );
}

Featured.propTypes = {
  productsData: PropTypes.array,
};
