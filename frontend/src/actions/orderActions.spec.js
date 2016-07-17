import {
  addOrderCustomerActionCreator,
  updateOrderActionCreator,
} from './orderActions.js';
import {
  ADD_ORDER_CUSTOMER,
  UPDATE_ORDER,
} from './actionTypes.js';


describe('synchronous action creators', () => {
  it('addOrderCustomerActionCreator creates ADD_ORDER_CUSTOMER action', () => {
    const customer = {
      customerName: 'customer0',
      customerAddress: 'address0',
      customerTel: 'tel0',

    };
    const expAction = {
      type: ADD_ORDER_CUSTOMER,
      ...customer,
    };
    const actualAction = addOrderCustomerActionCreator(customer);
    expect(actualAction).toEqual(expAction);
  });

  it('updateOrderActionCreator should create UPDATE_ORDER action', () => {
    const update = { attr: '' };
    const expAction = { type: UPDATE_ORDER, update };
    const actualAction = updateOrderActionCreator(update);
    expect(actualAction).toEqual(expAction);
  });
});
