/*eslint-env jest,jasmine */

jest.unmock('./currentPageReducer.js');
import reducer from './currentPageReducer.js';
import { INTRO } from '../sticky-layout/StickyLayout.jsx';

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
