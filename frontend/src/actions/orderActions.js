import { ADD_ORDER_CUSTOMER, UPDATE_ORDER } from './actionTypes.js';


const addOrderCustomerActionCreator = customer => ({
  type: ADD_ORDER_CUSTOMER,
  ...customer,
});

const updateOrderActionCreator = update => ({
  type: UPDATE_ORDER,
  update,
});

export {
  addOrderCustomerActionCreator,
  updateOrderActionCreator,
};
