import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';

import StickyBody from './components/sticky-body/sticky-body.jsx';

ReactDOM.render(
  <StickyBody/>,
  document.getElementsByClassName('sticky-footer--body')[0]
);
