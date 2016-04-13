import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import StickyBody from './components/sticky-layout/sticky-body.jsx';

ReactDOM.render(
  <StickyBody/>,
  document.getElementsByClassName('sticky-layout--body')[0]
);
