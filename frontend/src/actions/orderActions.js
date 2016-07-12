import {
  ADD_ORDER_CUSTOMER, SELECT_MENU,
} from './actionTypes.js';


const addOrderCustomerActionCreator = customer => ({
  type: ADD_ORDER_CUSTOMER,
  ...customer,
});

const selectMenuActionCreator = (dateTime, menuId, partySize) => ({
  type: SELECT_MENU,
  dateTime, menuId, partySize,
});

export {
  addOrderCustomerActionCreator, selectMenuActionCreator,
};
