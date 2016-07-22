import orderReducer from './orderReducer.js';
import { UPDATE_ORDER, VALIDATE_ORDER } from '../actions/actionTypes.js';


describe('order reducer', () => {
  const initState = {
    customerName: '',
    customerAddress: '',
    customerTel: '',
    dateTime: '',
    menuId: '',
    partySize: '',
  };

  it('initializes state', () => {
    const nextState = orderReducer(undefined, {});
    expect(nextState).toEqual(initState);
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
        partySize: '',
      };
      const nextState = orderReducer(initState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(initState);
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
        partySize: '',
      };
      const nextState = orderReducer(initState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(initState);
    });

    it('updates partySize', () => {
      const updateAction = {
        type: UPDATE_ORDER,
        update: { partySize: 'partySize0' },
      };
      const expState = {
        customerName: '',
        customerAddress: '',
        customerTel: '',
        dateTime: '',
        menuId: '',
        partySize: 'partySize0',
      };
      const nextState = orderReducer(initState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(initState);
    });
  });

  describe('handles validate order actions', () => {
    const mixedState = {
      customerName: 'name0',
      customerAddress: '',
      customerTel: 'tel0',
      dateTime: '',
      menuId: 'menu0',
      partySize: '',
    };

    it('marks filled fields as valid', () => {
      const field = 'customerName';
      const validateAction = { type: VALIDATE_ORDER, field };
      const expState = {...mixedState, customerNameValidated: true };
      const nextState = orderReducer(mixedState, validateAction);
      expect(nextState).toEqual(expState);
    });

    it('marks unfilled fields as invalid', () => {
      const field = 'customerAddress';
      const validateAction = { type: VALIDATE_ORDER, field };
      const expState = {...mixedState, customerAddressValidated: false };
      const nextState = orderReducer(mixedState, validateAction);
      expect(nextState).toEqual(expState);
    });
  });
});
