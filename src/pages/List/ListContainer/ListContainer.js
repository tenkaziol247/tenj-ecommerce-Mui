import React, { useState, useEffect, useRef } from "react";

import "./ListContainer.scss";
import ProductListing from "../ProductListing/ProductListing";
import Pagination from "../../../components/UI/Pagination/Pagination";
import Toolbox from "../Toolbox/Toolbox";
import ListingSidebar from "../ListingSidebar/ListingSidebar";

export default function ListContainer(props) {
  const listMainRef = useRef(null);

  const { productsData, isLoading, handleShowModal } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [gridType, setGridType] = useState(2);
  const [sortByType, setSortByType] = useState("default");
  const [productsSortBy, setProductsSortBy] = useState([]);
  const [productsCurrentPage, setProductsCurrentPage] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterCategoryProducts, setFilterCategoryProducts] = useState([]);
  const [filterPrice, setFilterPrice] = useState([0, 3000]);
  const [filterPriceProducts, setFilterPriceProducts] = useState([]);
  const [fieldCategory, setFieldCategory] = useState(null);
  const [flagClear, setFlagClear] = useState(false);

  useEffect(() => {
    if (filterCategory.length <= 0) {
      setFilterCategoryProducts([...productsData]);
    } else {
      const updateProducts = productsData.filter((ele) => {
        return ele.category.some((item) => {
          return filterCategory.includes(item.toLowerCase());
        });
      });
      setFilterCategoryProducts(updateProducts);
    }
  }, [filterCategory, productsData]);

  useEffect(() => {
    if (productsData.length > 0) {
      const newArr = productsData.reduce((ele1, ele2) => {
        return ele1.concat(ele2.category);
      }, []);
      const newObj = newArr.reduce((all, name) => {
        if (name in all) {
          all[name]++;
        } else {
          all[name] = 1;
        }
        return all;
      }, {});
      const newArrChecked = Object.keys(newObj).map((value, index) => {
        return { field: value, quantity: newObj[value], isChecked: false };
      });
      setFieldCategory(newArrChecked);
    }
  }, [productsData]);

  useEffect(() => {
    if (filterPrice[1] >= 3000) {
      const updateFilterProducts = filterCategoryProducts.filter((ele) => {
        return ele.newPrice >= filterPrice[0];
      });
      setFilterPriceProducts(updateFilterProducts);
    } else {
      const updateFilterProducts = filterCategoryProducts.filter((ele) => {
        return ele.newPrice >= filterPrice[0] && ele.newPrice <= filterPrice[1];
      });
      setFilterPriceProducts(updateFilterProducts);
    }
  }, [filterPrice, filterCategoryProducts]);

  useEffect(() => {
    let updateProducts = [...filterPriceProducts];

    if (sortByType === "lowToHigh") {
      setProductsSortBy(
        updateProducts.sort((a, b) => {
          return a.newPrice - b.newPrice;
        })
      );
    } else if (sortByType === "highToLow") {
      setProductsSortBy(
        updateProducts.sort((a, b) => {
          return b.newPrice - a.newPrice;
        })
      );
    } else if (sortByType === "mostReviews") {
      setProductsSortBy(
        updateProducts.sort((a, b) => {
          return b.review - a.review;
        })
      );
    } else {
      setProductsSortBy(updateProducts);
    }
  }, [sortByType, filterPriceProducts]);

  //get products current page
  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const updateProductsCurrentPage = productsSortBy.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setProductsCurrentPage(updateProductsCurrentPage);
  }, [productsSortBy, currentPage, productsPerPage]);

  const filterCategoryClickedHandler = (e) => {
    const newArr = [...fieldCategory];
    const indexObject = newArr.findIndex(
      (ele) => ele.field.toLowerCase() === e.target.value
    );
    if (!fieldCategory[indexObject].isChecked) {
      newArr[indexObject].isChecked = true;
      setFilterCategory([...filterCategory, e.target.value]);
    } else {
      newArr[indexObject].isChecked = false;
      const updateArr = filterCategory.filter((ele) => {
        return ele !== e.target.value;
      });
      setFilterCategory(updateArr);
    }
    setFieldCategory(newArr);
    setCurrentPage(1);
  };

  const paginateHandler = (numberPage) => {
    if (
      numberPage > 0 &&
      numberPage < Math.ceil(productsSortBy.length / productsPerPage) + 1
    ) {
      listMainRef.current.scrollIntoView();
      setCurrentPage(numberPage);
    }
  };

  const sortBySelectedHandler = (e) => {
    const value = e.target.value;

    if (value === "lowToHigh") {
      setSortByType("lowToHigh");
    } else if (value === "highToLow") {
      setSortByType("highToLow");
    } else if (value === "mostReviews") {
      setSortByType("mostReviews");
    } else {
      setSortByType("default");
    }
  };

  const gridTypeClickedHandler = (e) => {
    if (+e.currentTarget.value === 2) {
      setGridType(2);
    }
    if (+e.currentTarget.value === 3) {
      setGridType(3);
    }
  };

  const onFilterPrice = (newValue) => {
    setFilterPrice(newValue);
  };

  const clearAllClickedHandler = () => {
    const newArr = [...fieldCategory];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].isChecked = false;
    }
    setFieldCategory(newArr);
    setFilterCategory([]);
    setFlagClear((prev) => !prev);
    setFilterPrice([0, 3000]);
  };

  return (
    <section className="listContainer">
      <div className="listContainer__sidebar">
        <ListingSidebar
          fieldCategory={fieldCategory}
          filterCategoryClickedHandler={(e) => filterCategoryClickedHandler(e)}
          onFilterPrice={onFilterPrice}
          clearAllClickedHandler={clearAllClickedHandler}
          currentValue={filterPrice}
          flagClear={flagClear}
        />
      </div>
      <div className="listContainer__main" ref={listMainRef}>
        <Toolbox
          gridTypeClickedHandler={(e) => gridTypeClickedHandler(e)}
          gridType={gridType}
          productsPerPageCurrent={productsCurrentPage.length}
          totalProducts={productsSortBy.length}
          sortBySelectedHandler={(e) => sortBySelectedHandler(e)}
        />
        <ProductListing
          products={productsCurrentPage}
          girdColumn={gridType}
          loading={isLoading}
          handleShowModal={handleShowModal}
        />
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={productsSortBy.length}
          paginateHandler={paginateHandler}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
}
