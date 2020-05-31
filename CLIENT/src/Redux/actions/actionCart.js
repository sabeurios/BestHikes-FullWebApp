import {GET_BOOKED_EVENTS} from "./actionTypes"

export const getBookedEvent = (payload) => {
  return { type: GET_BOOKED_EVENTS, payload };
};
