import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import StickyLayout from './components/sticky-layout/StickyLayout.jsx';

// a redux reducer reacts/responds to actions by chging the state
// const reducer1 = (previousState, action) => Object.assign({}, previousState);
// combineReducers calls all reducers for all actions but chunks up state
// if you had state.a, state.b, state.c
// combineReducers({a: reducerThatWillChangeStateA, ... })
// so an action should contain all the info needed to chg states a and or b and or c if necessary
const rootReducer = (state, action) => state;
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <StickyLayout/>
  </Provider>,
  document.getElementById('reactApp')
);
