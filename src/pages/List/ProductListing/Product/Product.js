import { Button, IconButton } from "@material-ui/core";
import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

import "./Product.scss";
import * as actions from "../../../../store/action";

const useStyles = makeStyles((theme) => ({
  customButton: {
    borderRadius: 0,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
      "& > span": {
        paddingRight: "0px !important",
      },
      "& > span > span": {
        marginRight: "0px !important",
        paddingRight: "0px !important",
      },
    },
  },
  customIconButton: {
    transition: "all 0.3s ease",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

export default function Product(props) {
  const classes = useStyles();
  const { product } = props;

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = () => {
    enqueueSnackbar("Item added to Cart!", {
      variant: "success",
      autoHideDuration: 2000,
    });
  };

  const dispatch = useDispatch();

  const addToCart = (item, quantity) => {
    dispatch(actions.addToCart(item, quantity));
    handleClickVariant();
  };

  return (
    <div className="product">
      <div className="product__media">
        <div className="product__media__img">
          <img
            className="product__media__img__item1"
            src={product.image[0]}
            alt="product"
          />
          <img
            className="product__media__img__item2"
            src={product.image[1]}
            alt="product"
          />
        </div>
        <div className="product__action">
          <div className="product__action__addToCart">
            <Button
              color="primary"
              fullWidth
              startIcon={<AddShoppingCartIcon fontSize="small" />}
              className={classes.customButton}
              onClick={() => addToCart(product, 1)}
            >
              <span className="addToCartText">ADD TO CART</span>
            </Button>
          </div>
          <div className="product__action__quickView">
            <IconButton
              size="small"
              color="secondary"
              className={classes.customIconButton}
              onClick={() => props.handleShowModal(product)}
            >
              <VisibilityIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="product__text">
        <Link to="/" exact="true" title={product.title}>
          <h5>{product.title}</h5>
        </Link>
        <p>
          <span className="product__newPrice">${product.newPrice}</span>
          <span className="product__oldPrice">
            {product.oldPrice ? "$" + product.oldPrice : null}
          </span>
        </p>
      </div>
    </div>
  );
}
