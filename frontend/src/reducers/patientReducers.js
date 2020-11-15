import {
  PATIENT_LIST_REQUEST,
  PATIENT_DETAILS_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_DETAILS_FAIL,
  PATIENT_LIST_RESET,
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAIL,
  PATIENT_CREATE_REQUEST,
  PATIENT_CREATE_SUCCESS,
  PATIENT_CREATE_FAIL,
  PATIENT_CREATE_RESET,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_UPDATE_RESET,
} from "../constants/patientConstants";

export const patientlistReducer = (state = { patients: [] }, action) => {
  switch (action.type) {
    case PATIENT_LIST_REQUEST:
      return { loading: true, patients: [] };
    case PATIENT_LIST_SUCCESS:
      return { loading: false, patients: action.payload };
    case PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_LIST_RESET:
      return { patients: [] };
    default:
      return state;
  }
};

export const patientDetailsReducer = (
  state = {
    patient: {
      bloodpressure: [],
      bloodsugar: [],
      heartrate: [],
      saturation: [],
    },
  },
  action
) => {
  switch (action.type) {
    case PATIENT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PATIENT_DETAILS_SUCCESS:
      return { loading: false, patient: action.payload };
    case PATIENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const patientDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_DELETE_REQUEST:
      return { loading: true };
    case PATIENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PATIENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const patientCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_REQUEST:
      return { loading: true };
    case PATIENT_CREATE_SUCCESS:
      return { loading: false, success: true, patient: action.payload };
    case PATIENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const patientUpdateReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_REQUEST:
      return { loading: true };
    case PATIENT_UPDATE_SUCCESS:
      return { loading: false, success: true, patient: action.payload };
    case PATIENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_UPDATE_RESET:
      return { patient: {} };
    default:
      return state;
  }
};
