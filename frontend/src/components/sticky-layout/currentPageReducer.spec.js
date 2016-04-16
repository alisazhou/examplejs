/*eslint-env jest,jasmine */

jest.dontMock('./currentPageReducer.js');
const reducer = require('./currentPageReducer.js').default;

describe('redux state: currentPage', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      expect(reducer(undefined, {})).toEqual('intro');
    });
    it('should handle GO_TO_PAGE actions', () => {
      expect(reducer(
        'old', {type: 'GO_TO_PAGE', toPage: 'new'}
      )).toEqual('new');
    });
  });
});
