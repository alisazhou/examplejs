import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';

import currentPage from '../sticky-layout/currentPageReducer.js';
import sellers from '../seller/sellersReducer.js';
import currentSeller from '../seller/currentSellerReducer.js';

const rootReducer = combineReducers({ currentPage, sellers, currentSeller });
const logger = createLogger();
export let store = createStore(rootReducer, applyMiddleware(logger));

export default function wrapComponent (Component) {
  class WrappedComponent extends React.Component {
    render () {
      return (
        <Provider store={store}>
          <Component {...this.props}/>
        </Provider>
      );
    }
  }
  WrappedComponent.hasReduxStoreCreated = true;
  return WrappedComponent;
}

