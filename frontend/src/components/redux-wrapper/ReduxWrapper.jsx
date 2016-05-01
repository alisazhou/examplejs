import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import currentPage from '../sticky-layout/currentPageReducer.js';
import sellers from '../seller/sellersReducer.js';
import currentSeller from '../seller/currentSellerReducer.js';

const rootReducer = combineReducers({ currentPage, sellers, currentSeller });
export let store = createStore(rootReducer);

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

