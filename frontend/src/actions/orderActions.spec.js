import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  updateOrderActionCreator,
  validateOrderActionCreator,
  validatePage,
} from './orderActions.js';
import { UPDATE_ORDER, VALIDATE_ORDER } from './actionTypes.js';


describe('synchronous action creators', () => {
  it('updateOrderActionCreator should create UPDATE_ORDER action', () => {
    const update = { attr: '' };
    const expAction = { type: UPDATE_ORDER, update };
    const actualAction = updateOrderActionCreator(update);
    expect(actualAction).toEqual(expAction);
  });

  it('validateOrderActionCreator should create VALIDATE_ORDER action', () => {
    const field = 'field';
    const expAction = { type: VALIDATE_ORDER, field };
    const actualAction = validateOrderActionCreator(field);
    expect(actualAction).toEqual(expAction);
  });

  it('validatePageThunk should dispatch VALIDATE_ORDER action', () => {
    const mockStore = configureMockStore([ thunk ])({});
    const fields = [ 'fieldA', 'fieldB' ];
    const expActions = [
      validateOrderActionCreator('fieldA'),
      validateOrderActionCreator('fieldB'),
    ];
    mockStore.dispatch(validatePage(fields));
    const actualActions = mockStore.getActions();
    expect(actualActions).toEqual(expActions);
  });
});
