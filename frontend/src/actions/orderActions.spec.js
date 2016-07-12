import { selectMenuActionCreator } from './orderActions.js';
import { SELECT_MENU } from './actionTypes.js';


describe('synchronous action creators', () => {
  it('selectMenu action creator should create SELECT_MENU action', () => {
    const dateTime = 'time0';
    const menuId = 'menu0';
    const partySize = 1;
    const expAction = {
      type: SELECT_MENU,
      dateTime, menuId, partySize,
    };
    const actualAction = selectMenuActionCreator(dateTime, menuId, partySize);
    expect(actualAction).toEqual(expAction);
  });
});
