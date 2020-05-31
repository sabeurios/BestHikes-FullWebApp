import { GET_USERS ,GET_USER} from "./actionTypes";
import axios from "axios";

export const getUser =  (userID) => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/users/${userID}`)
    .then((res) => dispatch({ type: GET_USER, payload: res.data }))
    .catch((err) => console.log(err));
};

export const getUsers = () => async (dispatch) => {
  await axios
    .get(`http://localhost:5000/users/`)
    .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const updateUser = (userID,updatedUser) => async (dispatch) => {
  await axios
    .put(`http://localhost:5000/users/update/${userID}`,updatedUser)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};
