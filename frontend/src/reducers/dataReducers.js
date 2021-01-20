import {
    DATA_LIST_REQUEST,
    DATA_LIST_SUCCES,
    DATA_LIST_FAIL,
    DATA_LIST_RESET,
  } from "../constants/dataConstants";


  export const dataListReducer = (state = { alldata: [] }, action) => {
    switch (action.type) {
      case DATA_LIST_REQUEST:
        return { loading: true, alldata: [] };
      case DATA_LIST_SUCCES:
        return { loading: false, alldata: action.payload.alldata };
      case DATA_LIST_FAIL:
        return { loading: false, error: action.payload };
      case DATA_LIST_RESET:
        return { alldata: [] };
      default:
        return state;
    }
  };

  