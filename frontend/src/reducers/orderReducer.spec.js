import orderReducer from './orderReducer.js';
import { SELECT_MENU } from '../actions/actionTypes.js';


describe('order reducer', () => {
  const currState = {
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
      dateTime: 'time0',
      menuId: 'menu0',
      partySize: 1,
    };
    const nextState = orderReducer(currState, selectMenuAction);
    expect(nextState).toEqual(expState);
    expect(nextState).not.toBe(currState);
  });

});
