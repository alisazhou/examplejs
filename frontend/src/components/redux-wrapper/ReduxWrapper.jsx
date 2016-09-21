import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import auth from '../../reducers/authReducer.js';
import cuisines from '../../reducers/cuisinesReducer.js';
import menus from '../../reducers/menusReducer.js';
import order from '../../reducers/orderReducer.js';
import { reducer as form } from 'redux-form';

import StickyLayout from '../sticky-layout/StickyLayout.jsx';
import ContactPage from '../contact-page/ContactPage.jsx';
import IntroPage from '../intro-page/IntroPage.jsx';
import LoginPage from '../login-page/LoginPage.jsx';
import MenuPage from '../menu-page/MenuPage.jsx';
import NotFound from '../unknown-urls/NotFound.jsx';
import ReservationPage from '../reservation-page/ReservationPage.jsx';
import UnderConstruction from '../unknown-urls/UnderConstruction.jsx';


const rootReducer = combineReducers({
  auth,
  cuisines,
  menus,
  order,
  form,
});

const middlewares = [ thunk ];

// jest test runner node_env
if (process.env.NODE_ENV !== 'test') {
  const logger = createLogger();
  middlewares.push(logger);
}
let store = createStore(rootReducer, applyMiddleware(...middlewares));

class WrappedComponent extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory} >
          <Route path='/' component={StickyLayout}>
            <IndexRoute component={IntroPage} />
            <Route path='contact' component={ContactPage} />
            <Route path='menus/:menuId' component={MenuPage} />
            <Route path='reservation' component={ReservationPage} />
            <Route path='login' component={LoginPage} />
            <Route path='work-in-progress' component={UnderConstruction} />
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default WrappedComponent;
export { store };
