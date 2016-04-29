/*eslint-env jest,jasmine */

jest.dontMock('./peopleReducer.js');
const reducer = require('./peopleReducer.js').default;

describe('redux state: people', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      expect(reducer(undefined, {})).toEqual([
        { name: 'vincent' },
        { name: 'derek' },
        { name: 'conrad' },
      ]);
    });
    xit('should handle FETCH_PEOPLE_REQUEST actions', () => {
    });
  });
});
