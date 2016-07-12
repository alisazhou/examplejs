import {
  ADD_ORDER_CUSTOMER, SELECT_MENU,
} from '../actions/actionTypes.js';


const orderReducer = (state = {}, action) => {
  if (action.type === SELECT_MENU) {
    return {...state,
      dateTime: action.dateTime,
      menuId: action.menuId,
      partySize: action.partySize,
    };
  } else if (action.type === ADD_ORDER_CUSTOMER) {
    return {...state, 
      customerName: action.customerName,
      customerAddress: action.customerAddress,
      customerTel: action.customerTel,
    };
  }
  return state;
};

export default orderReducer;
