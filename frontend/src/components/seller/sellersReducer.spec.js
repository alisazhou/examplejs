/*eslint-env jest,jasmine */

jest.dontMock('./sellersReducer.js');
const reducer = require('./sellersReducer.js').default;

describe('redux state: sellers', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      expect(reducer(undefined, {})).toEqual([
        { name: 'vincent' },
        { name: 'derek' },
        { name: 'conrad' },
      ]);
    });
    xit('should handle FETCH_SELLERS_REQUEST actions', () => {
    });
  });
});
