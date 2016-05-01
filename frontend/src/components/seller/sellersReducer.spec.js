/*eslint-env jest,jasmine */

jest.dontMock('./sellersReducer.js');
const reducer = require('./sellersReducer.js').default;

describe('redux state: sellers', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      expect(reducer(undefined, {})).toEqual([
        { key: 0, id: 3, name: 'vincent' },
        { key: 1, id: 4, name: 'derek' },
        { key: 2, id: 5, name: 'conrad' },
      ]);
    });
  });
});
