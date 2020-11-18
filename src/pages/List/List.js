import React, { useState, useEffect } from "react";

import BackgroundCover from "../../components/BackgroundCover/BackgroundCover";
import ListContainer from "./ListContainer/ListContainer";
import Modal from "../../components/UI/Modal/Modal";
import QuickView from "../../components/QuickView/QuickView";
import { useSelector } from "react-redux";

export default function List(props) {
  const [openModal, setOpenModal] = useState(false);
  const [infoItem, setInfoItem] = useState(null);
  const [productsData, setProductsData] = useState([]);

  const { productsStore } = useSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    setProductsData([...productsStore]);
  }, [productsStore]);

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
      />
      <Modal openModal={openModal} handleCloseModal={handleCloseModal}>
        <QuickView item={infoItem} />
      </Modal>
    </>
  );
}
