import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { browserHistory, Route, Router } from 'react-router';

import currentPage from '../sticky-layout/currentPageReducer.js';
import sellers from '../seller/sellersReducer.js';
import currentSellerId from '../seller/currentSellerIdReducer.js';
import menus from '../menu-page/menusReducer.js';
import { reducer as form } from 'redux-form';

import StickyLayout from '../sticky-layout/StickyLayout.jsx';
import AvailabilityPage from '../availability-page/AvailabilityPage.jsx';
import MenuPage from '../menu-page/MenuPage.jsx';
import PaymentPage from '../payment-page/PaymentPage.jsx';
import ReservationPage from '../reservation-page/ReservationPage.jsx';


const rootReducer = combineReducers({
  currentPage,
  currentSellerId,
  form,
  menus,
  sellers,
});

const middlewares = [];

// jest test runner node_env
if (process.env.NODE_ENV !== 'test') {
  const logger = createLogger();
  middlewares.push(logger);
}
export let store = createStore(rootReducer, applyMiddleware(...middlewares));

export default class WrappedComponent extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory} >
          <Route path='/' component={StickyLayout} />
          <Route path='/availability' component={AvailabilityPage} />
          <Route path='/menus/:menuId' component={MenuPage} />
          <Route path='/payment' component={PaymentPage} />
          <Route path='/reservation' component={ReservationPage} />
        </Router>
      </Provider>
    );
  }
}
