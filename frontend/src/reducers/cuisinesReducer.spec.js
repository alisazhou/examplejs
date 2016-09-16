import cuisinesReducer from './cuisinesReducer.js';
jest.unmock('./cuisinesReducerInitialState.js');


describe('cuisines reducer', () => {
  it('initializes state', () => {
    const initState = [
      { id: 0, name: 'All Cuisines' },
      { id: 1, name: 'American' },
      { id: 2, name: 'Chinese' },
      { id: 3, name: 'French' },
      { id: 4, name: 'Indian' },
    ];
    const nextState = cuisinesReducer();
    expect(nextState).toEqual(initState);
  });
});
