jest.unmock('./menusReducerInitialState.js');
import menusReducer from './menusReducer.js';


describe('menus reducer', () => {
  it('initializes state', () => {
    const initialState = [
      {
        id: '0',
        name: 'Demo Menu 0',
        category: 'American',
        chef: 'cuckoo lis',
        description: 'description 0',
        image: 'image src 0',
      },
      {
        id: '1',
        name: 'Demo Menu 1',
        category: 'Chinese',
        chef: 'coco puffs',
        description: 'description 1',
        image: 'image src 1',
      },
    ];
    const nextState = menusReducer(undefined, {});
    expect(nextState).toEqual(initialState);
  });
});
