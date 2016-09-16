import orderReducer from './orderReducer.js';
import { UPDATE_ORDER } from '../actions/actionTypes.js';


describe('order reducer', () => {
  const initState = {
    customerName: '',
    customerAddress: '',
    customerTel: '',
    dateTime: '',
    menuId: '',
    orderValid: false,
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
      const expState = { ...initState, dateTime: 'time0' };
      const nextState = orderReducer(initState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(initState);
    });

    it('updates menuId', () => {
      const updateAction = {
        type: UPDATE_ORDER,
        update: { menuId: 'menu0' },
      };
      const expState = { ...initState, menuId: 'menu0' };
      const nextState = orderReducer(initState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(initState);
    });

    it('updates orderValid', () => {
      const updateAction = {
        type: UPDATE_ORDER,
        update: { orderValid: true },
      };
      const expState = { ...initState, orderValid: true };
      const nextState = orderReducer(initState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(initState);
    });

    it('updates partySize', () => {
      const updateAction = {
        type: UPDATE_ORDER,
        update: { partySize: 'partySize0' },
      };
      const expState = { ...initState, partySize: 'partySize0' };
      const nextState = orderReducer(initState, updateAction);
      expect(nextState).toEqual(expState);
      expect(nextState).not.toBe(initState);
    });
  });
});
