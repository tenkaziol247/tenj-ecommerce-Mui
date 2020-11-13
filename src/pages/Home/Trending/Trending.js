import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "./Trending.scss";
import TrendingPanel from "./TrendingPanel/TrendingPanel";
import Card from "../../../components/UI/Card/Card";
import Recommend from "./Recommend./Recommend";

const useStyles = makeStyles((theme) => ({
  customTabs: {
    "& > div > div": {
      flexWrap: "wrap",
      justifyContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      "& > div > span": {
        display: "none",
      },
    },
  },
  customTab: {
    color: theme.palette.common.black,
    fontSize: "14px",
    fontWeight: 400,
    minWidth: "60px",
    transition: "all 0.3s",
    padding: "0px 12px",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0 6px",
      padding: "0px 8px",
      minHeight: "32px",
    },
  },
}));

export default function Trending({ productsData, ...restProps }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [camerasData, setCamerasData] = useState([]);
  const [computersData, setComputersData] = useState([]);
  const [entertainmentData, setEntertainmentData] = useState([]);

  useEffect(() => {
    const updateAccessoriesData = [];
    const updateCamerasData = [];
    const updateComputersData = [];
    const updateEntertainmentData = [];
    productsData.forEach((ele) => {
      if (ele.category.includes("Accessories")) {
        updateAccessoriesData.push(ele);
      }
      if (ele.category.includes("Cameras")) {
        updateCamerasData.push(ele);
      }
      if (ele.category.includes("Computers")) {
        updateComputersData.push(ele);
      }
      if (ele.category.includes("Entertainment")) {
        updateEntertainmentData.push(ele);
      }
    });
    setAccessoriesData(updateAccessoriesData);
    setCamerasData(updateCamerasData);
    setComputersData(updateComputersData);
    setEntertainmentData(updateEntertainmentData);
  }, [productsData]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const allPanelRender = () => {
    if (productsData.length > 0) {
      return productsData.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            mediaHeight="240px"
            bodyHeight="160px"
            handleShowModal={restProps.handleShowModal}
          />
        );
      });
    }
  };

  const accessoriesPanelRender = () => {
    if (accessoriesData.length > 0) {
      return accessoriesData.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            mediaHeight="240px"
            bodyHeight="160px"
            handleShowModal={restProps.handleShowModal}
          />
        );
      });
    }
  };

  const camerasPanelRender = () => {
    if (camerasData.length > 0) {
      return camerasData.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            mediaHeight="240px"
            bodyHeight="160px"
            handleShowModal={restProps.handleShowModal}
          />
        );
      });
    }
  };

  const computersPanelRender = () => {
    if (computersData.length > 0) {
      return computersData.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            mediaHeight="240px"
            bodyHeight="160px"
            handleShowModal={restProps.handleShowModal}
          />
        );
      });
    }
  };

  const entertainmentsPanelRender = () => {
    if (entertainmentData.length > 0) {
      return entertainmentData.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            mediaHeight="240px"
            bodyHeight="160px"
            handleShowModal={restProps.handleShowModal}
          />
        );
      });
    }
  };

  return (
    <div className="trending">
      <div className="trending__header">
        <h2 className="trending__header__title">Trending Products</h2>
        <div className="trending__header__tabs">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            centered
            onChange={handleTabChange}
            className={classes.customTabs}
          >
            <Tab label="ALL" disableRipple className={classes.customTab} />
            <Tab
              label="ACCESSORIES"
              disableRipple
              className={classes.customTab}
            />
            <Tab
              label="CAMERAS &#38; CAMCORDERS"
              disableRipple
              className={classes.customTab}
            />
            <Tab
              label="COMPUTERS &#38; TABLETS"
              disableRipple
              className={classes.customTab}
            />
            <Tab
              label="ENTERTAINMENT"
              disableRipple
              className={classes.customTab}
            />
          </Tabs>
        </div>
      </div>
      <div className="trending__body">
        <div className="trending__body__recommend">
          <Recommend />
        </div>
        <div className="trending__body__panel">
          <TrendingPanel value={value} index={0}>
            {allPanelRender()}
          </TrendingPanel>
          <TrendingPanel value={value} index={1}>
            {accessoriesPanelRender()}
          </TrendingPanel>
          <TrendingPanel value={value} index={2}>
            {camerasPanelRender()}
          </TrendingPanel>
          <TrendingPanel value={value} index={3}>
            {computersPanelRender()}
          </TrendingPanel>
          <TrendingPanel value={value} index={4}>
            {entertainmentsPanelRender()}
          </TrendingPanel>
        </div>
      </div>
    </div>
  );
}
