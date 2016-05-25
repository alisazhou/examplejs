/*eslint-env jest,jasmine */

jest.unmock('./sellersReducer.js');
import reducer from './sellersReducer.js';

describe('redux state: sellers', () => {
  describe('reducer', () => {
    it('should return correct initial state', () => {
      expect(reducer(undefined, {})).toEqual([
        { id: 3, name: 'vincent' },
        { id: 4, name: 'derek' },
        { id: 5, name: 'conrad' },
      ]);
    });
  });
});
