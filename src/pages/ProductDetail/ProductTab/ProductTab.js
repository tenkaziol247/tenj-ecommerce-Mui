import { Tab, Tabs, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./ProductTab.scss";
import MyTabPanel from "../../../components/MyTabPanel/MyTabPanel";

const useStyles = makeStyles((theme) => ({
  cusTab: {
    border: "1px solid transparent",
    transition: "all 0.5s ease-in",
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

export default function ProductTab(props) {
  const classes = useStyles();

  const { product } = props;

  const [value, setValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="productTab">
      <div className="productTab__tabsContainer">
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
        >
          <Tab label="Description" className={classes.cusTab} />
          <Tab
            label={`Reviews (${product.review})`}
            className={classes.cusTab}
          />
        </Tabs>
      </div>
      <div className="productTab__panel">
        <MyTabPanel value={value} index={0}>
          <div className="productTab__content">
            <h4 className="productTab__content__title">Product Information</h4>
            <p>{product.description}</p>
          </div>
        </MyTabPanel>
        <MyTabPanel value={value} index={1}>
          <div className="productTab__content">
            <h4 className="productTab__content__title">{`Reviews (${product.review})`}</h4>
            {[...Array(product.review)].map((_, index) => {
              return (
                <Grid
                  key={index}
                  container
                  className="productTab__review__item"
                  spacing={2}
                >
                  <Grid item xs={4} md={3} lg={2} className="review__left">
                    <div className="review__avatar">
                      <AccountCircleIcon fontSize="large" color="primary" />
                    </div>
                    <div className="review__info">
                      <div className="review__name">John Doe</div>
                      <div className="review__rate">
                        {[...Array(5)].map((_, index) => {
                          return (
                            <span key={index} className="yellow-star">
                              <i className="fa fa-star"></i>
                            </span>
                          );
                        })}
                      </div>
                      <p className="review__date">6 days ago</p>
                    </div>
                  </Grid>
                  <Grid item xs={8} md={9} lg={10}>
                    <div className="review__title">Very good</div>
                    <p className="review__context">
                      Sed, molestias, tempore? Ex dolor esse iure hic veniam
                      laborum blanditiis laudantium iste amet. Cum non voluptate
                      eos enim, ab cumque nam, modi, quas iure illum
                      repellendus, blanditiis perspiciatis beatae!
                    </p>
                    <div className="review__comment">{`Comment (1)`}</div>
                  </Grid>
                </Grid>
              );
            })}
          </div>
        </MyTabPanel>
      </div>
    </div>
  );
}
