import {
  addOrderCustomerActionCreator, selectMenuActionCreator,
} from './orderActions.js';
import {
  ADD_ORDER_CUSTOMER, SELECT_MENU,
} from './actionTypes.js';


describe('synchronous action creators', () => {
  it('addOrderCustomerActionCreator creates ADD_ORDER_CUSTOMER action', () => {
    const customer = {
      customerName: 'customer0',
      customerAddress: 'address0',
      customerTel: 'tel0',

    };
    const expAction = {
      type: ADD_ORDER_CUSTOMER,
      ...customer,
    };
    const actualAction = addOrderCustomerActionCreator(customer);
    expect(actualAction).toEqual(expAction);
  });

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
