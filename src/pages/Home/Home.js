import React, { useState, useEffect } from "react";
import axios from "axios";

import axiosBaseURL from "../../constant/axios-baseURL";
import Loader from "../../components/Loader/Loader";
import Cover from "./Cover/Cover";
import Categories from "./Categories/Categories";
import Featured from "./Featured/Featured";

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [coverLeftData, setCoverLeftData] = useState([]);
  const [coverRightData, setCoverRightData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const coverLeftUrl = axiosBaseURL.get("/mainCover.json");
    const coverRightUrl = axiosBaseURL.get("/minorCover.json");
    const urlCats = axiosBaseURL.get("/cats.json");
    const urlProducts = axiosBaseURL.get("/products.json");
    // const urlDeals = axiosBaseURL.get("/deals.json");
    // const urlPartners = axiosBaseURL.get("/partners.json");
    // const urlRecommend = axiosBaseURL.get("/recommend.json");

    let unmount = false;
    setIsLoading(true);
    axios
      .all([coverLeftUrl, coverRightUrl, urlCats, urlProducts])
      .then(
        axios.spread((...allResponse) => {
          if (!unmount) {
            setCoverLeftData(allResponse[0].data);
            setCoverRightData(allResponse[1].data);
            setCategoriesData(allResponse[2].data);
            setProductsData(allResponse[3].data);
            // setDealsData(allResponse[4].data);
            // setPartnersData(allResponse[5].data);
            // setRecommendData(allResponse[6].data);
            setIsLoading(false);
          }
        })
      )
      .catch((error) => {
        if (!unmount) {
          console.log(error.message);
          setIsLoading(false);
        }
      });
    return () => {
      unmount = true;
    };
  }, []);

  const homeRender = () => {
    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <>
          <Cover
            coverLeftData={coverLeftData}
            coverRightData={coverRightData}
          />
          <Categories categoriesData={categoriesData} />
          <Featured productsData={productsData} />
        </>
      );
    }
  };

  return homeRender();
}
