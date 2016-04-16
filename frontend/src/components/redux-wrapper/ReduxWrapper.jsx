import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const rootReducer = (state, action) => state;
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

