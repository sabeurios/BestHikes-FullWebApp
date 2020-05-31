import {
  GET_ADVICES,
} from "./actionTypes";
import axios from "axios";

export const getAdvices = () => async (dispatch) => {
  await axios
    .get("http://localhost:5000/advices/")
    .then((res) => dispatch({ type: GET_ADVICES, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addAdvice = (newAdvice) => (dispatch) => {
  axios
    .post("http://localhost:5000/advices/add", newAdvice)
    .then((res) => dispatch(getAdvices()))
    .catch((err) => console.log(err));
};

export const deleteAdvice = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:5000/advices/${id}`)
    .then((res) => dispatch(getAdvices()))
    .catch((err) => console.log(err));
};

export const updateAdvice = (id, updatedAdvice) => (dispatch) => {
  axios
    .put(`http://localhost:5000/advices/${id}`, updatedAdvice)
    .then((res) => dispatch(getAdvices(), { payload: res.data }))
    .catch((err) => console.log(err));
};
