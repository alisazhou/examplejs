/*eslint-env jest,jasmine */

jest.dontMock('./currentSellerActions.js');
const currentSellerActionsModule= require('./currentSellerActions.js');

describe('currentSellerActions', () => {
  it('should export SELECT_SELLER', () => {
    // otherwise requiring SELECT_SELLER in the tests
    // actually returns undefined. which causes all sorts of weirdness
    expect(currentSellerActionsModule.SELECT_SELLER).toBeDefined();
  });
  it('should export selectSellerActionCreator', () => {
    expect(currentSellerActionsModule.selectSellerActionCreator).toBeDefined();
  });
});
