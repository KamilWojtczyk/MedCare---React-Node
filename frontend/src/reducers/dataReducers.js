import {
  DATA_LIST_REQUEST,
  DATA_LIST_SUCCES,
  DATA_LIST_FAIL,
  DATA_LIST_RESET,
} from "../constants/dataConstants";

export const dataListReducer = (state = { datas: [] }, action) => {
  switch (action.type) {
    case DATA_LIST_REQUEST:
      return { loading: true };
    case DATA_LIST_SUCCES:
      return { loading: false, datas: action.payload };
    case DATA_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DATA_LIST_RESET:
      return { datas: [] };
    default:
      return state;
  }
};
