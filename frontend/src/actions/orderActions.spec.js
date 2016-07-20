import {
  updateOrderActionCreator,
  validateOrderActionCreator,
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
});
