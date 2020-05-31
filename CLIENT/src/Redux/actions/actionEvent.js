import { GET_EVENTS, GET_EVENT, GET_DATE, GET_DEPART, GET_DESTINATION, GET_ORGANISATORS, GET_PARTICIPANT } from "./actionTypes";
import axios from "axios";

export const getEvents =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/events/")
    .then((res) => dispatch({ type: GET_EVENTS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getEvent =  (id) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/events/${id}`)
    .then((res) => dispatch({ type: GET_EVENT, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addEvent = (newEvent) => (dispatch) => {
  axios
    .post("http://localhost:5000/events/add", newEvent)
    .then((res) => dispatch(getEvents()))
    .catch((err) => console.log(err));
};

export const deleteEvent = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:5000/events/${id}`)
    .then((res) => dispatch(getEvents()))
    .catch((err) => console.log(err));
};

export const updateEvent = (id, updatedEvent) => (dispatch) => {
  axios
    .put(`http://localhost:5000/events/${id}`, updatedEvent)
    .then((res) => dispatch(getEvents(),{payload: res.data }))
    .catch((err) => console.log(err));
};

export const bookEvent = (userID,eventID) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/events/book/${userID}/${eventID}`)
    .then((res) => dispatch(getEvents(),{payload: res.data }))
    .catch((err) => console.log(err));
};

export const updatePlaces = (idEvent, updatedPlaces) =>  (dispatch) => {
   axios
    .put(`http://localhost:5000/events/book/${idEvent}/${updatedPlaces}`)
    .then((res) => dispatch(getEvents()))
    .catch((err) => console.log(err));
};

export const updateLikes = (idEvent) =>  (dispatch) => {
  axios
   .put(`http://localhost:5000/events/like/${idEvent}`)
   .then((res) => dispatch(getEvents()))
   .catch((err) => console.log(err));
};

export const updatedisLikes = (idEvent) =>  (dispatch) => {
  axios
   .put(`http://localhost:5000/events/dislike/${idEvent}`)
   .then((res) => dispatch(getEvents()))
   .catch((err) => console.log(err));
};


// filter events
export const filterEvents =  (index) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/events/findEvents/${index}`)
    .then((res) => dispatch({ type: GET_EVENTS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getEventsOrganisators =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/events/filterOrganisator")
    .then((res) => dispatch({ type: GET_ORGANISATORS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getEventsDestinations =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/events/filterDestination")
    .then((res) => dispatch({ type: GET_DESTINATION, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getEventsDeparts =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/events/filterDepart")
    .then((res) => dispatch({ type: GET_DEPART, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getEventsDates =  () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/events/filterDate")
    .then((res) => dispatch({ type: GET_DATE, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getParticipants =  (id) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/events/participantInEvent/${id}`)
    .then((res) => dispatch({ type: GET_PARTICIPANT, payload: res.data }))
    .catch((err) => console.log(err));
};
