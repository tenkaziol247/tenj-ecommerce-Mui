import React, { useState, useEffect } from "react";
import axios from "axios";

import axiosBaseURL from "../../constant/axios-baseURL";
import Loader from "../../components/Loader/Loader";
import Cover from "./Cover/Cover";
import Categories from "./Categories/Categories";
import Featured from "./Featured/Featured";
import QuickView from "../../components/QuickView/QuickView";
import Modal from "../../components/UI/Modal/Modal";
import Renew from "./Renew/Renew";
import Deals from "./Deals/Deals";
import Partners from "./Partners/Partners";
import Trending from "./Trending/Trending";
import Services from "./Services/Services";

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [infoItem, setInfoItem] = useState(null);
  const [coverLeftData, setCoverLeftData] = useState([]);
  const [coverRightData, setCoverRightData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [dealsData, setDealsData] = useState([]);
  const [partnersData, setPartnersData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    const coverLeftUrl = axiosBaseURL.get("/mainCover.json");
    const coverRightUrl = axiosBaseURL.get("/minorCover.json");
    const urlCats = axiosBaseURL.get("/cats.json");
    const urlProducts = axiosBaseURL.get("/products.json");
    const urlDeals = axiosBaseURL.get("/deals.json");
    const urlPartners = axiosBaseURL.get("/partners.json");

    let unmount = false;
    setIsLoading(true);
    axios
      .all([
        coverLeftUrl,
        coverRightUrl,
        urlCats,
        urlProducts,
        urlDeals,
        urlPartners,
      ])
      .then(
        axios.spread((...allResponse) => {
          if (!unmount) {
            setCoverLeftData(allResponse[0].data);
            setCoverRightData(allResponse[1].data);
            setCategoriesData(allResponse[2].data);
            setProductsData(allResponse[3].data);
            setDealsData(allResponse[4].data);
            setPartnersData(allResponse[5].data);
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

  useEffect(() => {
    const updateFeaturedData = [];
    const updateTrendingData = [];
    productsData.forEach((ele) => {
      if (ele.trending) {
        updateTrendingData.push(ele);
      }
      if (ele.featured) {
        updateFeaturedData.push(ele);
      }
    });
    setFeaturedData(updateFeaturedData);
    setTrendingData(updateTrendingData);
  }, [productsData]);

  const handleShowModal = (item) => {
    setOpenModal(true);
    setInfoItem(item);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
          <Featured
            productsData={featuredData}
            handleShowModal={handleShowModal}
          />
          <Renew />
          <Deals dealsData={dealsData} />
          <Partners partnersData={partnersData} />
          <Trending
            productsData={trendingData}
            handleShowModal={handleShowModal}
          />
          <Services />
          <Modal openModal={openModal} handleCloseModal={handleCloseModal}>
            <QuickView item={infoItem} />
          </Modal>
        </>
      );
    }
  };

  return homeRender();
}
