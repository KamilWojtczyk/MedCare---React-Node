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
  patientBloodsugarCreateReducer,
  patientSaturationCreateReducer,
  patientCommentCreateReducer,
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
import {
  dataListReducer,
} from "./reducers/dataReducers";

const reducer = combineReducers({
  patientList: patientlistReducer,
  patientDetails: patientDetailsReducer,
  patientDelete: patientDeleteReducer,
  patientCreate: patientCreateReducer,
  patientUpdate: patientUpdateReducer,
  patientBloodpressureCreate: patientBloodpressureCreateReducer,
  patientHeartrateCreate: patientHeartrateCreateReducer,
  patientBloodsugarCreate: patientBloodsugarCreateReducer,
  patientSaturationCreate: patientSaturationCreateReducer,
  patientCommentCreate: patientCommentCreateReducer,
  userLogin: userloginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  dataList: dataListReducer,
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
