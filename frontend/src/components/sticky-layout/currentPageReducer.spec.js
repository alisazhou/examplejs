/*eslint-env jest,jasmine */

jest.dontMock('./currentPageReducer.js');
const reducer = require('./currentPageReducer.js').default;

describe('redux state: currentPage', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      expect(reducer(undefined, {})).toEqual({ currentPage: 'intro' });
    });
    xit('should handle CHANGE_PAGE actions', () => {
    });
  });
});
