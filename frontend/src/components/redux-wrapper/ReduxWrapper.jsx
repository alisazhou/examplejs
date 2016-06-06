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
import MenuPage from '../menu-page/MenuPage.jsx';


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
          <Route path='/menus/:menuId' component={MenuPage} />
        </Router>
      </Provider>
    );
  }
}
