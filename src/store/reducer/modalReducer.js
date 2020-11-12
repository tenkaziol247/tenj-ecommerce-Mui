import * as actionTypes from "../actionTypes/actionTypes";

const initialState = {
  modalStatus: false,
  quickViewInfo: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        modalStatus: true,
        quickViewInfo: { ...action.info },
      };
    case actionTypes.REMOVE_MODAL:
      return { ...state, modalStatus: false };
    default:
      return state;
  }
};

export default modalReducer;
