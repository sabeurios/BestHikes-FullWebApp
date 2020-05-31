import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import EventReducer from "../reducers/EventReducer";
import UserReducer from "../reducers/UserReducer"
import AdviceReducer from "../reducers/AdviceReducer"

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  users: UserReducer,
  user: UserReducer,
  events: EventReducer,
  organisator: EventReducer,
  destination: EventReducer,
  depart: EventReducer,
  date: EventReducer,
  participant : EventReducer,
  advices: AdviceReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;
