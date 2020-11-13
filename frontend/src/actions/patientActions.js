import axios from "axios";
import {
  PATIENT_LIST_FAIL,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_REQUEST,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_DETAILS_FAIL,
} from "../constants/patientConstants";

export const listPatients = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/patients", config);

    dispatch({
      type: PATIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPatientDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/patients/${id}`, config);

    dispatch({
      type: PATIENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
