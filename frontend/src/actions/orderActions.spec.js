import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { updateOrderActionCreator } from './orderActions.js';
import { UPDATE_ORDER } from './actionTypes.js';


describe('synchronous action creators', () => {
  it('updateOrderActionCreator should create UPDATE_ORDER action', () => {
    const update = { attr: '' };
    const expAction = { type: UPDATE_ORDER, update };
    const actualAction = updateOrderActionCreator(update);
    expect(actualAction).toEqual(expAction);
  });
});
