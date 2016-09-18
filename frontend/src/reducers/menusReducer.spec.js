jest.unmock('./menusReducerInitialState.js');
import menusReducer from './menusReducer.js';
import initialState from './menusReducerInitialState.js';


describe('menus reducer', () => {
  it('initializes state', () => {
    const nextState = menusReducer(undefined, {});
    expect(nextState).toEqual(initialState);
  });
});
