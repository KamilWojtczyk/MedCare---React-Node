import axios from "axios";
import {
  PATIENT_LIST_FAIL,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_REQUEST,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_DETAILS_FAIL,
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAIL,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_SUCCESS,
  PATIENT_CREATE_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_CREATE_BLOODPRESSURE_REQUEST,
  PATIENT_CREATE_BLOODPRESSURE_SUCCESS,
  PATIENT_CREATE_BLOODPRESSURE_FAIL,
  PATIENT_CREATE_HEARTRATE_REQUEST,
  PATIENT_CREATE_HEARTRATE_SUCCESS,
  PATIENT_CREATE_HEARTRATE_FAIL,
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

export const deletePatient = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/patients/${id}`, config);

    dispatch({
      type: PATIENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPatient = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/patients`, {}, config);

    dispatch({
      type: PATIENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePatient = (patient) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/patients/${patient._id}`,
      patient,
      config
    );

    dispatch({
      type: PATIENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPatientBloodpressure = (patientId, bloodpressure) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PATIENT_CREATE_BLOODPRESSURE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `/api/patients/${patientId}/bloodpressure`,
      bloodpressure,
      config
    );

    dispatch({
      type: PATIENT_CREATE_BLOODPRESSURE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_CREATE_BLOODPRESSURE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPatientHeartrate = (patientId, heartrate) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PATIENT_CREATE_HEARTRATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/patients/${patientId}/heartrate`, heartrate, config);

    dispatch({
      type: PATIENT_CREATE_HEARTRATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_CREATE_HEARTRATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
