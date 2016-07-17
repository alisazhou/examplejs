import orderReducer from './orderReducer.js';
import {
  ADD_ORDER_CUSTOMER,
  UPDATE_ORDER,
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

  describe('handles update order action', () => {
    it('updates dateTime', () => {
      const updateAction = {
        type: UPDATE_ORDER,
        update: { dateTime: 'time0' },
      };
      const expState = {
        customerName: '',
        customerAddress: '',
        customerTel: '',
        dateTime: 'time0',
        menuId: '',
        partySize: 0,
      };
      const nextState = orderReducer(currState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(currState);
    });

    it('updates menuId', () => {
      const updateAction = {
        type: UPDATE_ORDER,
        update: { menuId: 'menu0' },
      };
      const expState = {
        customerName: '',
        customerAddress: '',
        customerTel: '',
        dateTime: '',
        menuId: 'menu0',
        partySize: 0,
      };
      const nextState = orderReducer(currState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(currState);
    });

    it('updates partySize', () => {
      const updateAction = {
        type: UPDATE_ORDER,
        update: { partySize: 1 },
      };
      const expState = {
        customerName: '',
        customerAddress: '',
        customerTel: '',
        dateTime: '',
        menuId: '',
        partySize: 1,
      };
      const nextState = orderReducer(currState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(currState);
    });
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
