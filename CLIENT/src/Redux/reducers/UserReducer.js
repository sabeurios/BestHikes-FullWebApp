import { GET_USERS, GET_USER } from "../actions/actionTypes";

const initState = { users: [], user: [] };

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default UserReducer;
