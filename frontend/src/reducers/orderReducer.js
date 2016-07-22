import { UPDATE_ORDER, VALIDATE_ORDER } from '../actions/actionTypes.js';


const initialState = {
  customerAddress: '',
  customerName: '',
  customerTel: '',
  dateTime: '',
  menuId: '',
  partySize: '',
};

const orderReducer = (state = initialState, action) => {
  if (action.type === UPDATE_ORDER) {
    return {...state, ...action.update };
  } else if (action.type === VALIDATE_ORDER) {
    return {...state,
      [ `${action.field}Validated` ]: state[action.field] !== '',
    };
  }
  return state;
};

export default orderReducer;
