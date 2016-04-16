import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import currentPage from '../sticky-layout/currentPageReducer.js'

const rootReducer = combineReducers({ currentPage });
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

