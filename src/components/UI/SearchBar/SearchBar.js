import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";

import "./SearchBar.scss";
import { Link } from "react-router-dom";

export default function SearchBar(props) {
  const [products, setProducts] = useState([]);
  const [suggestArr, setSuggestArr] = useState([]);

  const inputRef = useRef(null);

  const { productsStore } = useSelector((state) => state.products);

  useEffect(() => {
    const updateProducts = productsStore.map((ele, index) => {
      return { name: ele.title, id: ele.id };
    });
    updateProducts.sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    setProducts(updateProducts);
  }, [productsStore]);

  const handleValueChange = (e) => {
    let text = e.target.value.toLowerCase();
    let updateSuggest = [];
    if (text.length > 0) {
      updateSuggest = products.filter((ele) =>
        ele.name.toLowerCase().includes(text)
      );
    }
    setSuggestArr(updateSuggest);
  };

  const handleFocusInput = () => {
    inputRef.current.focus();
  };

  const handleInputBlur = (e) => {
    e.preventDefault();
    setTimeout(() => {
      inputRef.current && inputRef.current.classList.remove("searching");
      setSuggestArr([]);
    }, 100);
  };

  const suggestRender = () => {
    if (suggestArr.length === 0) {
      inputRef.current && inputRef.current.classList.remove("searching");
      return null;
    } else {
      inputRef.current && inputRef.current.classList.add("searching");
      return (
        <ul>
          {suggestArr.map((ele) => {
            return (
              <li key={ele.id}>
                <Link to={`/product/${ele.id}`}>{ele.name}</Link>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <div className="wrapperSearchBar">
      <div className="searchBar">
        <input
          placeholder="Search..."
          type="text"
          className="searchBar__input"
          ref={inputRef}
          onChange={handleValueChange}
          onBlur={handleInputBlur}
        />
        <div className="searchBar__icon" onClick={handleFocusInput}>
          <SearchIcon />
        </div>
        <div className="searchBar__suggest">{suggestRender()}</div>
      </div>
    </div>
  );
}
