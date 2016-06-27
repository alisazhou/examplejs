import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

import cuisines from '../../reducers/cuisinesReducer.js';
import currentSellerId from '../../reducers/currentSellerIdReducer.js';
import menus from '../../reducers/menusReducer.js';
import sellers from '../../reducers/sellersReducer.js';
import { reducer as form } from 'redux-form';

import StickyLayout from '../sticky-layout/StickyLayout.jsx';
import AvailabilityPage from '../availability-page/AvailabilityPage.jsx';
import ContactPage from '../contact-page/ContactPage.jsx';
import IntroPage from '../intro-page/IntroPage.jsx';
import MenuPage from '../menu-page/MenuPage.jsx';
import PaymentPage from '../payment-page/PaymentPage.jsx';
import ReservationPage from '../reservation-page/ReservationPage.jsx';


const rootReducer = combineReducers({
  cuisines,
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
          <Route path='/' component={StickyLayout}>
            <IndexRoute component={IntroPage} />
            <Route path='availability' component={AvailabilityPage} />
            <Route path='contact' component={ContactPage} />
            <Route path='payment' component={PaymentPage} />
            <Route path='reservation' component={ReservationPage} />
          </Route>
          <Route path='menus/:menuId' component={MenuPage} />
        </Router>
      </Provider>
    );
  }
}
