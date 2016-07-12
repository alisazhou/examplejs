import { SELECT_MENU } from '../actions/actionTypes.js';


const orderReducer = (state = {}, action) => {
  if (action.type === SELECT_MENU) {
    return Object.assign({}, state, {
      dateTime: action.dateTime,
      menuId: action.menuId,
      partySize: action.partySize,
    });
  }
  return state;
};

export default orderReducer;
