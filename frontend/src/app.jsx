import React from 'react';
import ReactDOM from 'react-dom';

import setupRedux from './components/redux-wrapper/ReduxWrapper.jsx';
import StickyLayout from './components/sticky-layout/StickyLayout.jsx';

const LayoutWithRedux = setupRedux(StickyLayout);

ReactDOM.render(
  <LayoutWithRedux/>,
  document.getElementById('reactApp')
);
