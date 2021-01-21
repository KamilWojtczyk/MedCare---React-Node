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
  PATIENT_CREATE_BLOODPRESSURE_REQUEST,
  PATIENT_CREATE_BLOODPRESSURE_SUCCESS,
  PATIENT_CREATE_BLOODPRESSURE_FAIL,
  PATIENT_CREATE_BLOODPRESSURE_RESET,
  PATIENT_CREATE_HEARTRATE_REQUEST,
  PATIENT_CREATE_HEARTRATE_SUCCESS,
  PATIENT_CREATE_HEARTRATE_FAIL,
  PATIENT_CREATE_HEARTRATE_RESET,
  PATIENT_CREATE_BLOODSUGAR_REQUEST,
  PATIENT_CREATE_BLOODSUGAR_SUCCESS,
  PATIENT_CREATE_BLOODSUGAR_FAIL,
  PATIENT_CREATE_BLOODSUGAR_RESET,
  PATIENT_CREATE_SATURATION_REQUEST,
  PATIENT_CREATE_SATURATION_SUCCESS,
  PATIENT_CREATE_SATURATION_FAIL,
  PATIENT_CREATE_SATURATION_RESET,
  PATIENT_CREATE_COMMENT_SUCCESS,
  PATIENT_CREATE_COMMENT_REQUEST,
  PATIENT_CREATE_COMMENT_FAIL,
  PATIENT_CREATE_COMMENT_RESET,
  PATIENT_DETAILS_WITH_DATA_REQUEST,
  PATIENT_DETAILS_WITH_DATA_SUCCESS,
  PATIENT_DETAILS_WITH_DATA_FAIL,
} from "../constants/patientConstants";

export const patientlistReducer = (state = { patients: [] }, action) => {
  switch (action.type) {
    case PATIENT_LIST_REQUEST:
      return { loading: true, patients: [] };
    case PATIENT_LIST_SUCCESS:
      return {
        loading: false,
        patients: action.payload.patients,
        pages: action.payload.pages,
        page: action.payload.page,
      };
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
    loading: true,
    patient: {
      bloodpressure: [],
      bloodsugar: [],
      heartrate: [],
      saturation: [],
      comment: [],
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

export const patientDetailsWithDataReducer = (
  state = {
    patientwithdata: {
      patient: {
        bloodpressure: [],
        bloodsugar: [],
        heartrate: [],
        saturation: [],
        comment: [],
      },
      data: {
        bloodpressure: [],
        bloodsugar: [],
        heartrate: [],
        saturation: [],
      }
    },
  },
  action
) => {
  switch (action.type) {
    case PATIENT_DETAILS_WITH_DATA_REQUEST:
      return { loading: true, ...state };
    case PATIENT_DETAILS_WITH_DATA_SUCCESS:
      return { loading: false, patientwithdata: action.payload };
    case PATIENT_DETAILS_WITH_DATA_FAIL:
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

export const patientBloodpressureCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_BLOODPRESSURE_REQUEST:
      return { loading: true };
    case PATIENT_CREATE_BLOODPRESSURE_SUCCESS:
      return { loading: false, success: true };
    case PATIENT_CREATE_BLOODPRESSURE_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_CREATE_BLOODPRESSURE_RESET:
      return {};
    default:
      return state;
  }
};

export const patientHeartrateCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_HEARTRATE_REQUEST:
      return { loading: true };
    case PATIENT_CREATE_HEARTRATE_SUCCESS:
      return { loading: false, success: true };
    case PATIENT_CREATE_HEARTRATE_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_CREATE_HEARTRATE_RESET:
      return {};
    default:
      return state;
  }
};

export const patientBloodsugarCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_BLOODSUGAR_REQUEST:
      return { loading: true };
    case PATIENT_CREATE_BLOODSUGAR_SUCCESS:
      return { loading: false, success: true };
    case PATIENT_CREATE_BLOODSUGAR_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_CREATE_BLOODSUGAR_RESET:
      return {};
    default:
      return state;
  }
};

export const patientSaturationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_SATURATION_REQUEST:
      return { loading: true };
    case PATIENT_CREATE_SATURATION_SUCCESS:
      return { loading: false, success: true };
    case PATIENT_CREATE_SATURATION_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_CREATE_SATURATION_RESET:
      return {};
    default:
      return state;
  }
};

export const patientCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_CREATE_COMMENT_REQUEST:
      return { loading: true };
    case PATIENT_CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case PATIENT_CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_CREATE_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};
