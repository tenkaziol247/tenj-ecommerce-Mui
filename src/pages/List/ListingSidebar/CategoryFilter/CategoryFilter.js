import React from "react";
import Loader from "../../../../components/Loader/Loader";

import CategoryFilterItem from "./CategoryFilterItem/CategoryFilterItem";

export default function CategoryFilter(props) {
  const { fieldCategory } = props;

  let categoryFilterRender = <Loader />;

  if (fieldCategory !== null) {
    categoryFilterRender = fieldCategory.map((item, index) => {
      return (
        <CategoryFilterItem
          key={item.field}
          field={item.field}
          productQuantity={item.quantity}
          filterCategoryClickedHandler={props.filterCategoryClickedHandler}
          isChecked={item.isChecked}
        />
      );
    });
  }

  return <div className="categoryFilter">{categoryFilterRender}</div>;
}
