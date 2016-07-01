jest.unmock('./sellersActions.js');
import { FETCH_SELLERS_REQUEST } from './sellersActions.js';

describe('sellersActions', () => {
  it('should export FETCH_SELLERS_REQUEST', () => {
    // otherwise requiring SELECT_SELLER in the tests
    // actually returns undefined. which causes all sorts of weirdness
    expect(FETCH_SELLERS_REQUEST).toBeDefined();
  });
});
