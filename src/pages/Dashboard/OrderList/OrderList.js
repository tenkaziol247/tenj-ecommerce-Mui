import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import * as actions from "../../../store/action";
import Loader from "../../../components/Loader/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@material-ui/core";
import OrderRow from "./OrderRow/OrderRow";

const useStyles = makeStyles((theme) => ({
  cusTableCell__2: {
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      width: "unset",
    },
  },
}));

export default function OrderList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    currentUser && dispatch(actions.fetchOrder(currentUser.uid));
  }, [dispatch, currentUser]);

  let orderListRender = (
    <TableBody>
      <TableRow>
        <TableCell colSpan={3}>
          <Box component="h3" m={2}>
            No Orders in List
          </Box>
        </TableCell>
      </TableRow>
    </TableBody>
  );
  if (orders.length > 0) {
    orderListRender = (
      <TableBody>
        {orders.map((ele) => {
          return <OrderRow key={ele.orderId} row={ele} />;
        })}
      </TableBody>
    );
  }

  return (
    <div className="orderList">
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell className={classes.cusTableCell__2}>
                  <Box component="h3" color="primary.main">
                    Order ID
                  </Box>
                </TableCell>
                <TableCell>
                  <Box component="h3" color="primary.main">
                    Date
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            {orderListRender}
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
