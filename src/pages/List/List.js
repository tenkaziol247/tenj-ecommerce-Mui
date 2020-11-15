import React, { useState, useEffect } from "react";

import BackgroundCover from "../../components/BackgroundCover/BackgroundCover";
import ListContainer from "./ListContainer/ListContainer";
import Modal from "../../components/UI/Modal/Modal";
import QuickView from "../../components/QuickView/QuickView";
import axios from "../../constant/axios-baseURL";

export default function List(props) {
  const [openModal, setOpenModal] = useState(false);
  const [infoItem, setInfoItem] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let unmount = false;
    setIsLoading(true);
    axios
      .get("/products.json")
      .then((response) => {
        if (!unmount) {
          setProductsData(response.data);
          setIsLoading(false);
        }
      })
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

  const handleShowModal = (item) => {
    setOpenModal(true);
    setInfoItem(item);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <BackgroundCover>
        <h2>Product List</h2>
        <p>TenJ</p>
      </BackgroundCover>
      <ListContainer
        productsData={productsData}
        handleShowModal={handleShowModal}
        isLoading={isLoading}
      />
      <Modal openModal={openModal} handleCloseModal={handleCloseModal}>
        <QuickView item={infoItem} />
      </Modal>
    </>
  );
}
