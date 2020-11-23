import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UpdateIcon from "@material-ui/icons/Update";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";

import "./CartMain.scss";
import * as actions from "../../../store/action";
import CartList from "../CartList/CartList";
import CartSummary from "../CartSummary/CartSummary";

const useStyles = makeStyles((theme) => ({
  disagreeBtn: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  agreeBtn: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

export default function CartMain(props) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");

  const { cartStore } = useSelector((state) => {
    return state.cart;
  });

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = () => {
    enqueueSnackbar("Item removed from Cart!", {
      variant: "warning",
      autoHideDuration: 2000,
    });
  };

  const subtractClickedHandler = (item) => {
    if (item.quantity > 1) {
      return dispatch(actions.addToCart(item, -1));
    }
  };

  const addClickedHandler = (item) => {
    return dispatch(actions.addToCart(item, 1));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setId("");
  };

  const handleAgreeClicked = () => {
    handleClickVariant();
    dispatch(actions.removeFromCart(id));
    handleCloseModal();
  };

  const onRemoveProductToCart = (id) => {
    setOpenModal(true);
    setId(id);
  };

  return (
    <>
      <section className="cartMain">
        <div className="cartMain__left">
          <CartList
            cartStore={cartStore}
            subtractClickedHandler={subtractClickedHandler}
            addClickedHandler={addClickedHandler}
            onRemoveProductToCart={onRemoveProductToCart}
          />
        </div>
        <div className="cartMain__right">
          <CartSummary
            subTotal={cartStore
              .reduce((total, ele) => {
                return (total += ele.price * ele.quantity);
              }, 0)
              .toFixed(2)}
          />
          <div className="cartMain__continueShopping">
            <Button
              component={Link}
              variant="outlined"
              color="secondary"
              disableElevation
              to="/list"
              endIcon={<UpdateIcon />}
            >
              CONTINUE SHOPPING
            </Button>
          </div>
        </div>
      </section>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle id="alert-dialog-title">{"Remove Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove product from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAgreeClicked}
            variant="contained"
            disableElevation
            className={classes.agreeBtn}
          >
            Agree
          </Button>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            disableElevation
            autoFocus
            className={classes.disagreeBtn}
          >
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
