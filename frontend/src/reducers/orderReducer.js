import {
  ADD_ORDER_CUSTOMER,
  UPDATE_ORDER,
} from '../actions/actionTypes.js';


const orderReducer = (state = {}, action) => {
  if (action.type === ADD_ORDER_CUSTOMER) {
    return {...state, 
      customerName: action.customerName,
      customerAddress: action.customerAddress,
      customerTel: action.customerTel,
    };
  } else if (action.type === UPDATE_ORDER) {
    return {...state, ...action.update };
  }
  return state;
};

export default orderReducer;
