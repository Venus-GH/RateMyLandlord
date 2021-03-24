import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import allLandlords from "./landlords";
import reviews from "./reviews";
import landlord from "./singleLandlord";
import buildings from "./buildings";
import reviewList from "./reviewList";

const reducer = combineReducers({
  user,
  allLandlords,
  landlord,
  reviews,
  buildings,
  reviewList,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
