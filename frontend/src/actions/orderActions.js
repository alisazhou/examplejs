import { SELECT_MENU } from './actionTypes.js';


const selectMenuActionCreator = (dateTime, menuId, partySize) => ({
  type: SELECT_MENU,
  dateTime, menuId, partySize,
});

export { selectMenuActionCreator };
