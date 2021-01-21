import axios from "axios";
import { DATA_LIST_FAIL, DATA_LIST_REQUEST, DATA_LIST_SUCCES } from "../constants/dataConstants";

export const listData = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DATA_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/patients/${id}`, config);
    console.log(data)

    dispatch({
      type: DATA_LIST_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DATA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};