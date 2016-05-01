/*eslint-env jest,jasmine */

jest.dontMock('./currentSellerReducer.js');
const reducer = require('./currentSellerReducer.js').default;
jest.dontMock('./currentSellerActions.js');
const selectSellerActionCreator = require('./currentSellerActions.js').selectSellerActionCreator;

describe('redux state: currentSeller', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      expect(reducer(undefined, {})).toEqual(null);
    });
    it('should handle SELECT_SELLER actions', () => {
      expect(reducer(
        'random previous state',
        selectSellerActionCreator(231)
      )).toEqual(231);
    });
  });
});
