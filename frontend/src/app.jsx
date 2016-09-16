import React from 'react';
import ReactDOM from 'react-dom';

import WrappedLayout from './components/redux-wrapper/ReduxWrapper.jsx';

import 'babel-polyfill';

ReactDOM.render(
  <WrappedLayout/>,
  document.getElementById('reactApp')
);
