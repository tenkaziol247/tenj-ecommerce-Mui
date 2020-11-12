import * as actionTypes from "../actionTypes/actionTypes";

export const showModal = (info) => {
  return {
    type: actionTypes.SHOW_MODAL,
    info,
  };
};

export const removeModal = () => {
  return {
    type: actionTypes.REMOVE_MODAL,
  };
};
