import {
  GET_EVENTS,
  GET_EVENT,
  GET_DATE,
  GET_DEPART,
  GET_DESTINATION,
  GET_ORGANISATORS,
  GET_PARTICIPANT
} from "../actions/actionTypes";

const initState = {
  events: [],
  organisator: [],
  destination: [],
  depart: [],
  date: [],
  participant : []
};

const EventReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: action.payload };
    case GET_EVENT:
      return { ...state, events: action.payload };
    case GET_ORGANISATORS:
      return { ...state, organisator: action.payload };
    case GET_DESTINATION:
      return { ...state, destination: action.payload };
    case GET_DEPART:
      return { ...state, depart: action.payload };
    case GET_DATE:
      return { ...state, date: action.payload };
    case GET_PARTICIPANT:
      return { ...state, participant: action.payload };
    default:
      return state;
  }
};
export default EventReducer;
