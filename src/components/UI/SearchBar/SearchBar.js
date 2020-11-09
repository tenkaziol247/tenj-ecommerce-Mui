import React from "react";

import { makeStyles, fade, duration } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    boxSizing: "border-box",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    border: `1px solid transparent`,
    borderRadius: "24px",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.2),
    },
    margin: theme.spacing("auto", 0),
    width: "100%",
    height: "100%",
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      width: "auto",
    },
    [theme.breakpoints.down("md")]: {
      "&:hover": {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(0, 2),
    },
  },
  inputRoot: {
    color: theme.palette.common.white,
    flex: 1,
  },
  inputInput: {
    width: "100%",
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width", duration.complex),
      width: "16ch",
      "&:focus": {
        width: "36ch",
      },
    },
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}
