import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  patientlistReducer,
  patientDetailsReducer,
} from "./reducers/patientReducers.js";

const reducer = combineReducers({
  patientList: patientlistReducer,
  patientDetails: patientDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
