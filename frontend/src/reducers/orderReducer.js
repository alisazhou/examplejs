import { UPDATE_ORDER } from '../actions/actionTypes.js';


const initialState = {
  customerAddress: '',
  customerName: '',
  customerTel: '',
  dateTime: '',
  menuId: '',
  orderValid: false,
  partySize: '',
};

const orderReducer = (state = initialState, action) => {
  if (action.type === UPDATE_ORDER) {
    return {...state, ...action.update };
  }
  return state;
};

export default orderReducer;
