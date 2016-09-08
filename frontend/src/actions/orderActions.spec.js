import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  updateOrderActionCreator,
  validateOrderActionCreator,
  updateAndValidate,
} from './orderActions.js';
import { UPDATE_ORDER, VALIDATE_ORDER } from './actionTypes.js';


describe('synchronous action creators', () => {
  const field = {
    name: 'name0', valid: true, value: 'value0',
  };
  it('updateOrderActionCreator should create UPDATE_ORDER action', () => {
    const update = { attr: '' };
    const expAction = { type: UPDATE_ORDER, update };
    const actualAction = updateOrderActionCreator(update);
    expect(actualAction).toEqual(expAction);
  });

  it('validateOrderActionCreator should create VALIDATE_ORDER action', () => {
    const expAction = {
      type: VALIDATE_ORDER,
      fieldName: 'name0', validStatus: true,
    };
    const actualAction = validateOrderActionCreator(field.name, field.valid);
    expect(actualAction).toEqual(expAction);
  });

  it('validateAndUpdate batched actions', () => {
    const mockStore = configureMockStore([ thunk ])({});
    const expActions = [
      updateOrderActionCreator({ name0: 'value0'}),
      validateOrderActionCreator('name0', true),
    ];
    mockStore.dispatch(updateAndValidate(field));
    expect(mockStore.getActions()).toEqual(expActions);
  });

});
