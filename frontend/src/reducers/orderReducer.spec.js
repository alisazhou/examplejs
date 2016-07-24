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
    it('marks fields as valid', () => {
      const field = {
        fieldName: 'fieldName', validStatus: true,
      };
      const validateAction = { type: VALIDATE_ORDER, ...field };
      const expState = { fieldNameValidated: true };
      const nextState = orderReducer({}, validateAction);
      expect(nextState).toEqual(expState);
    });

    it('marks fields as invalid', () => {
      const field = {
        fieldName: 'fieldName', validStatus: false,
      };
      const validateAction = { type: VALIDATE_ORDER, ...field };
      const expState = { fieldNameValidated: false };
      const nextState = orderReducer({}, validateAction);
      expect(nextState).toEqual(expState);
    });
  });
});
