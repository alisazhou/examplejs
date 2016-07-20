import { UPDATE_ORDER } from '../actions/actionTypes.js';


const orderReducer = (state = {}, action) => {
  if (action.type === UPDATE_ORDER) {
    return {...state, ...action.update };
  }
  return state;
};

export default orderReducer;
