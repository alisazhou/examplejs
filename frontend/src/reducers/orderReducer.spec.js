import orderReducer from './orderReducer.js';
import {
  ADD_ORDER_CUSTOMER, SELECT_MENU,
} from '../actions/actionTypes.js';


describe('order reducer', () => {
  const currState = {
    customerName: '',
    customerAddress: '',
    customerTel: '',
    dateTime: '',
    menuId: '',
    partySize: 0,
  };

  it('initializes state', () => {
    const nextState = orderReducer(undefined, {});
    expect(nextState).toEqual({});
  });

  it('handles select menu action', () => {
    const selectMenuAction = {
      type: SELECT_MENU,
      dateTime: 'time0',
      menuId: 'menu0',
      partySize: 1,
    };
    const expState = {
      customerName: '',
      customerAddress: '',
      customerTel: '',
      dateTime: 'time0',
      menuId: 'menu0',
      partySize: 1,
    };
    const nextState = orderReducer(currState, selectMenuAction);
    expect(nextState).toEqual(expState);
    expect(nextState).not.toBe(currState);
  });

  it('handles add customer to order action', () => {
    const addOrderCustomerAction = {
      type: ADD_ORDER_CUSTOMER,
      customerName: 'customer0',
      customerAddress: 'address0',
      customerTel: 'tel0',
    };
    const expState = {
      customerName: 'customer0',
      customerAddress: 'address0',
      customerTel: 'tel0',
      dateTime: '',
      menuId: '',
      partySize: 0,
    };
    const nextState = orderReducer(currState, addOrderCustomerAction);
    expect(nextState).toEqual(expState);
    expect(nextState).not.toBe(currState);
  });
});
