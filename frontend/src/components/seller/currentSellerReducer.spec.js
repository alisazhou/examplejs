/*eslint-env jest,jasmine */

jest.unmock('./currentSellerReducer.js');
import reducer from './currentSellerReducer.js';
jest.unmock('./currentSellerActions.js');
import { selectSellerActionCreator } from './currentSellerActions.js';

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
