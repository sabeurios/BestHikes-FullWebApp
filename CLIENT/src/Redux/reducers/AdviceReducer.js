import { GET_ADVICES } from "../actions/actionTypes";

const initState = {
  advices: [],
};

const AdviceReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ADVICES:
      return { ...state, advices: action.payload };
    default:
      return state;
  }
};
export default AdviceReducer;
