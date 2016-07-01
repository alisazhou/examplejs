import cuisinesReducer from './cuisinesReducer.js';


describe('cuisines reducer', () => {
  it('initializes state', () => {
    const initState = [
      { id: 0, name: 'American' },
      { id: 1, name: 'Chinese' },
      { id: 2, name: 'French' },
      { id: 3, name: 'Indian' },
    ];
    const nextState = cuisinesReducer();
    expect(nextState).toEqual(initState);
  });
});
