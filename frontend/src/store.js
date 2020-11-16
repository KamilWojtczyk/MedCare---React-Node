import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  patientlistReducer,
  patientDetailsReducer,
  patientDeleteReducer,
  patientCreateReducer,
  patientUpdateReducer,
  patientBloodpressureCreateReducer,
  patientHeartrateCreateReducer,
} from "./reducers/patientReducers.js";
import {
  userloginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  patientList: patientlistReducer,
  patientDetails: patientDetailsReducer,
  patientDelete: patientDeleteReducer,
  patientCreate: patientCreateReducer,
  patientUpdate: patientUpdateReducer,
  patientBloodpressureCreate: patientBloodpressureCreateReducer,
  patientHeartrateCreate: patientHeartrateCreateReducer,
  userLogin: userloginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
