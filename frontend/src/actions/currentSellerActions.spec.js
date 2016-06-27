/*eslint-env jest,jasmine */

jest.unmock('./currentSellerActions.js');
import { SELECT_SELLER, selectSellerActionCreator } from './currentSellerActions.js';

describe('currentSellerActions', () => {
  it('should export SELECT_SELLER', () => {
    // otherwise requiring SELECT_SELLER in the tests
    // actually returns undefined. which causes all sorts of weirdness
    expect(SELECT_SELLER).toBeDefined();
  });
  it('should export selectSellerActionCreator', () => {
    expect(selectSellerActionCreator).toBeDefined();
  });
});
