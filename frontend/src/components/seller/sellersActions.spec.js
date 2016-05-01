/*eslint-env jest,jasmine */

jest.dontMock('./sellersActions.js');
const sellersActionsModule= require('./sellersActions.js');

describe('sellersActions', () => {
  it('should export FETCH_SELLERS_REQUEST', () => {
    // otherwise requiring SELECT_SELLER in the tests
    // actually returns undefined. which causes all sorts of weirdness
    expect(sellersActionsModule.FETCH_SELLERS_REQUEST).toBeDefined();
  });
});
