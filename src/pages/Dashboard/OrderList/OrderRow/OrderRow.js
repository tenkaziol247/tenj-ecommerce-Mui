import {
  Box,
  Collapse,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import "./OrderRow.scss";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    "& > *": {
      borderBottom: "unset",
    },
  },
  cusTableCell: {
    [theme.breakpoints.down(419)]: {
      padding: "12px 4px",
    },
  },
  cusTableCellCollapse: {
    [theme.breakpoints.down(360)]: {
      padding: "12px 2px",
    },
  },
}));

export default function OrderRow({ row, ...restProps }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        className={classes.root}
        onClick={() => setOpen((prev) => !prev)}
      >
        <TableCell className={classes.cusTableCell}>
          <Box>{open ? <ExpandMoreIcon /> : <ExpandLessIcon />}</Box>
        </TableCell>
        <TableCell className={classes.cusTableCell} component="th" scope="row">
          <Box color="text.secondary">{row.orderId}</Box>
        </TableCell>
        <TableCell className={classes.cusTableCell}>
          <Box color="info.main">{new Date(row.orderDate).toUTCString()}</Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} border={1} borderRadius={4} overflow="hidden">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.cusTableCellCollapse}>
                      Product
                    </TableCell>
                    <TableCell className={classes.cusTableCellCollapse}>
                      Quantity
                    </TableCell>
                    <TableCell className={classes.cusTableCellCollapse}>
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderData.map((ele) => {
                    return (
                      <TableRow key={ele.id}>
                        <TableCell className={classes.cusTableCellCollapse}>
                          <Box
                            color="info.main"
                            component={Link}
                            to={`/product/${ele.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {ele.name}
                          </Box>
                        </TableCell>
                        <TableCell className={classes.cusTableCellCollapse}>
                          {ele.quantity}
                        </TableCell>
                        <TableCell className={classes.cusTableCellCollapse}>
                          {ele.price}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Box mr={1} component="h4" color="secondary.main">
                        <span>Total: </span>$
                        {row.orderData
                          .reduce((sum, ele) => {
                            return (sum += ele.price * ele.quantity);
                          }, 0)
                          .toFixed(2)}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
