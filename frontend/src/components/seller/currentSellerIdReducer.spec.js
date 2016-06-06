/*eslint-env jest,jasmine */
jest.unmock('./currentSellerActions.js');
import { selectSellerActionCreator } from './currentSellerActions.js';
import reducer from './currentSellerIdReducer.js';


describe('redux state: currentSellerId', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      expect(reducer(undefined, {})).toEqual(-1);
    });
    it('should handle SELECT_SELLER actions', () => {
      expect(reducer(
        'random previous state',
        selectSellerActionCreator(231)
      )).toEqual(231);
    });
  });
});
