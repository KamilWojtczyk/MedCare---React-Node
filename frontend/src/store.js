import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  patientlistReducer,
  patientDetailsReducer,
} from "./reducers/patientReducers.js";
import { userloginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  patientList: patientlistReducer,
  patientDetails: patientDetailsReducer,
  userLogin: userloginReducer,
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
