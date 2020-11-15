import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./CategoryFilterItem.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > span": {
      padding: "0 8px 0 0",
    },
  },
}));

export default function CategoryFilterItem(props) {
  const classes = useStyles();
  return (
    <div className="categoryFilterItem">
      <div className="categoryFilterItem__checkbox">
        <FormControlLabel
          className={classes.root}
          control={
            <Checkbox
              color="primary"
              id={(props.field + "category").toLowerCase()}
              name={(props.field + "category").toLowerCase()}
              value={props.field.toLowerCase()}
              onChange={(e) => props.filterCategoryClickedHandler(e)}
              checked={props.isChecked}
            />
          }
          label={props.field}
        />
      </div>
      <span className="categoryFilterItem__quantity">
        {props.productQuantity}
      </span>
    </div>
  );
}
