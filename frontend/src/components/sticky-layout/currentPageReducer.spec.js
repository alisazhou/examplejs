/*eslint-env jest,jasmine */

jest.dontMock('./currentPageReducer.js');
const reducer = require('./currentPageReducer.js').default;
jest.dontMock('../sticky-layout/StickyLayout.jsx');
const INTRO = require('../sticky-layout/StickyLayout.jsx').INTRO;

describe('redux state: currentPage', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      expect(reducer(undefined, {})).toEqual(INTRO);
    });
    it('should handle GO_TO_PAGE actions', () => {
      expect(reducer(
        'old', {type: 'GO_TO_PAGE', toPage: 'new'}
      )).toEqual('new');
    });
  });
});
