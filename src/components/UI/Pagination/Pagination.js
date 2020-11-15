import React from "react";
import PropTypes from "prop-types";

import "./Pagination.scss";

export default function Pagination(props) {
  const {
    productsPerPage,
    totalProducts,
    paginateHandler,
    currentPage,
  } = props;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginationRender = () => {
    return pageNumbers.map((numb) => {
      return (
        <li
          key={numb}
          onClick={() => paginateHandler(numb)}
          className={currentPage === numb ? "active" : ""}
        >
          {numb}
        </li>
      );
    });
  };

  return (
    <nav className="pagination">
      <ul>
        <li
          onClick={() => paginateHandler(currentPage - 1)}
          className={currentPage === 1 ? "disabled" : ""}
        >
          <span className="pagination__prev">
            <i className="fa fa-caret-left"></i>
          </span>
          Prev
        </li>
        {paginationRender()}
        <li
          onClick={() => paginateHandler(currentPage + 1)}
          className={
            currentPage === Math.ceil(totalProducts / productsPerPage)
              ? "disabled"
              : ""
          }
        >
          Next
          <span className="pagination__next">
            <i className="fa fa-caret-right"></i>
          </span>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  paginateHandler: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
};
